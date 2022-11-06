const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Stepan Bandera", "Petro Oleksiyovych", "Oleksiy Arestovych"], // Names
    [
      "https://i.imgur.com/D0YP34c.jpeg", // Images
      "https://i.imgur.com/Q1e9gYY.jpeg",
      "https://ranok.ictv.ua/wp-content/uploads/sites/59/2022/03/18/arestovich-foto-2.jpg",
    ],
    [100, 200, 300], // HP values
    [100, 50, 25] // Attack damage values
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
