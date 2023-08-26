const { expect } = require("chai");

describe("SecureBanking Contract", function () { // Updated contract name
  let SecureBanking; // Updated contract name
  let secureBanking; // Updated contract name
  let signer1;
  let signer2;

  before(async function () {
    SecureBanking = await ethers.getContractFactory("SecureBanking"); // Updated contract name
  });

  beforeEach(async function () {
    [signer1, signer2] = await ethers.getSigners();

    secureBanking = await SecureBanking.deploy(); // Updated contract name
    await secureBanking.deployed();
  });

  it("Should deposit funds", async function () {
    const depositAmount = ethers.utils.parseEther("1.0");
    await secureBanking.connect(signer2).deposit({ value: depositAmount });

    const balance = await secureBanking.connect(signer2).getAccountBalance(); // Updated function name
    expect(balance).to.equal(depositAmount);
  });

  it("Should withdraw funds", async function () {
    const depositAmount = ethers.utils.parseEther("2.0");
    await secureBanking.connect(signer2).deposit({ value: depositAmount });

    const withdrawAmount = ethers.utils.parseEther("1.0");
    await secureBanking.connect(signer2).withdraw(withdrawAmount);

    const balance = await secureBanking.connect(signer2).getAccountBalance(); // Updated function name
    expect(balance).to.equal(depositAmount.sub(withdrawAmount));
  });

  it("Should not allow withdrawal if balance is insufficient", async function () {
    const depositAmount = ethers.utils.parseEther("0.5");
    await secureBanking.connect(signer2).deposit({ value: depositAmount });

    const withdrawAmount = ethers.utils.parseEther("1.0");
    await expect(secureBanking.connect(signer2).withdraw(withdrawAmount)).to.be.revertedWith(
      "Insufficient Balance"
    );
  });

  it("Should get the balance of an account", async function () {
    const depositAmount = ethers.utils.parseEther("1.5");
    await secureBanking.connect(signer2).deposit({ value: depositAmount });

    const balance = await secureBanking.connect(signer2).getAccountBalance(); // Updated function name
    expect(balance).to.equal(depositAmount);
  });
});
