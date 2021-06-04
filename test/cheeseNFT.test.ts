import { expect } from "./chai-setup";
import { CheeseNft } from "../typechain";
import hre, {
  ethers,
  deployments,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { setupUser, setupUsers } from "./utils";

const DAY_IN_SECS = 24 * 61 * 60;

const setup = async () => {
  await deployments.fixture(["CheeseNFT"]);
  const { deployer } = await getNamedAccounts();
  const participants = await getUnnamedAccounts();
  const contracts = {
    CheeseNFT: (await ethers.getContract("CheeseNFT")) as CheeseNft,
  };

  return {
    ...contracts,
    deployer: await setupUser(deployer, contracts),
    participants: await setupUsers(participants, contracts),
  };
};

describe("CheeseNFT Tests", () => {
  describe("Initialization", () => {
    it("Should properly initialize the contract.", async () => {
      const { CheeseNFT } = await setup();

      expect(await CheeseNFT.name()).to.equal("Cheese");
      expect(await CheeseNFT.symbol()).to.equal("CHS");
      expect(await CheeseNFT.getCurrentTokenId()).to.equal(0);
      expect(await CheeseNFT.getLastTouched()).to.equal(0);
    });
  });

  describe("Cheese Creation Tests", () => {
    it("Should allow cheese creation.", async () => {
      const { CheeseNFT, deployer } = await setup();

      await expect(CheeseNFT.createCheeseNFT())
        .to.emit(CheeseNFT, "Transfer")
        .withArgs(ethers.constants.AddressZero, deployer.address, 1);
    });

    it("Should not allow cheese creation when live token exists.", async () => {
      const { CheeseNFT, participants } = await setup();
      await CheeseNFT.createCheeseNFT();
      await expect(CheeseNFT.createCheeseNFT()).to.be.revertedWith(
        "You cannot create cheese when one is living."
      );
      await expect(
        participants[0].CheeseNFT.createCheeseNFT()
      ).to.be.revertedWith("You cannot create cheese when one is living.");
    });

    it("Should allow cheese creation when live token dies.", async () => {
      const { CheeseNFT, deployer } = await setup();
      await CheeseNFT.createCheeseNFT();

      await hre.network.provider.send("evm_increaseTime", [DAY_IN_SECS]);

      await expect(CheeseNFT.createCheeseNFT())
        .to.emit(CheeseNFT, "Transfer")
        .withArgs(ethers.constants.AddressZero, deployer.address, 2);
    });
  });

  describe("Cheese Transfer Tests", () => {
    it("Should allow cheese transfer.", async () => {
      const { CheeseNFT, deployer, participants } = await setup();
      await CheeseNFT.createCheeseNFT();

      const approvalTxn = CheeseNFT.approve(participants[0].address, 1);
      const transferTxn = CheeseNFT.transferFrom(
        deployer.address,
        participants[0].address,
        1
      );
      await expect(approvalTxn)
        .to.emit(CheeseNFT, "Approval")
        .withArgs(deployer.address, participants[0].address, 1);
      await expect(transferTxn)
        .to.emit(CheeseNFT, "Transfer")
        .withArgs(deployer.address, participants[0].address, 1);
    });

    it("Should not allow cheese transfer if new user holds it for too long.", async () => {
      const { CheeseNFT, deployer, participants } = await setup();
      await CheeseNFT.createCheeseNFT();

      await CheeseNFT.approve(participants[0].address, 1);
      await CheeseNFT.transferFrom(
        deployer.address,
        participants[0].address,
        1
      );

      await hre.network.provider.send("evm_increaseTime", [DAY_IN_SECS]);

      await participants[0].CheeseNFT.approve(deployer.address, 1);
      await expect(
        participants[0].CheeseNFT.transferFrom(
          participants[0].address,
          deployer.address,
          1
        )
      ).to.be.revertedWith("You cannot transfer your dead cheese.");
    });

    it("Should not allow cheese transfer when token dies.", async () => {
      const { CheeseNFT, deployer, participants } = await setup();
      await CheeseNFT.createCheeseNFT();

      await hre.network.provider.send("evm_increaseTime", [DAY_IN_SECS]);

      await expect(
        CheeseNFT.transferFrom(deployer.address, participants[0].address, 1)
      ).to.be.revertedWith("You cannot transfer your dead cheese.");
    });

    it("Should not allow cheese transfer when token dies and a new cheese is created.", async () => {
      const { CheeseNFT, deployer, participants } = await setup();
      await CheeseNFT.createCheeseNFT();

      await hre.network.provider.send("evm_increaseTime", [DAY_IN_SECS]);
      await CheeseNFT.createCheeseNFT();

      await CheeseNFT.approve(participants[0].address, 1);
      await expect(
        CheeseNFT.transferFrom(deployer.address, participants[0].address, 1)
      ).to.be.revertedWith("You cannot transfer your dead cheese.");
    });
  });
});
