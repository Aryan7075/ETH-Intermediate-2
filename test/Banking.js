const { expect } = require("chai");

describe("Banking Contract", function () {
  let Banking;
  let banking;
  let signer1;
  let signer2;

  before(async function () {
    Banking = await ethers.getContractFactory("Banking");
  });

  beforeEach(async function () {
    [signer1, signer2] = await ethers.getSigners();

    banking = await Banking.deploy();
    await banking.deployed();
  });

  it("Should deposit funds", async function () {
    const depositAmount = ethers.utils.parseEther("1.0");
    await banking.connect(signer2).deposit({ value: depositAmount });

    const balance = await banking.connect(signer2).getBalance();
    expect(balance).to.equal(depositAmount);
  });

  it("Should withdraw funds", async function () {
    const depositAmount = ethers.utils.parseEther("2.0");
    await banking.connect(signer2).deposit({ value: depositAmount });

    const withdrawAmount = ethers.utils.parseEther("1.0");
    await banking.connect(signer2).withdraw(withdrawAmount);

    const balance = await banking.connect(signer2).getBalance();
    expect(balance).to.equal(depositAmount.sub(withdrawAmount));
  });

  it("Should not allow withdrawal if balance is insufficient", async function () {
    const depositAmount = ethers.utils.parseEther("0.5");
    await banking.connect(signer2).deposit({ value: depositAmount });

    const withdrawAmount = ethers.utils.parseEther("1.0");
    await expect(banking.connect(signer2).withdraw(withdrawAmount)).to.be.revertedWith(
      "Insufficient Balance"
    );
  });

  it("Should get the balance of an account", async function () {
    const depositAmount = ethers.utils.parseEther("1.5");
    await banking.connect(signer2).deposit({ value: depositAmount });

    const balance = await banking.connect(signer2).getBalance();
    expect(balance).to.equal(depositAmount);
  });
});
