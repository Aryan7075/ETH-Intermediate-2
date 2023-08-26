const { ethers } = require("hardhat");

async function main() {
  const SecureBanking = await ethers.getContractFactory("SecureBanking"); // Updated contract name
  const secureBanking = await SecureBanking.deploy();
  await secureBanking.deployed();

  console.log("SecureBanking contract deployed to:", secureBanking.address); // Updated contract name
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
