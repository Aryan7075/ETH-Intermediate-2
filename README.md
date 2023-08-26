# Banking Web Application
This is a decentralised web page to withdraw and deposit tokens using your crypto wallet

## Prerequisites
* Node.js
* MetaMask Extension
* Remix IDE
* Project IDE

## Installation 
* Fork this repository and download the project folder on your local computer
* run a command prompt on the project folder
* Install the dependencies and plugins
```
(!) npm init -y
(2) npm i --save-dev hardhat
(3) npm i --save-dev @nomiclabs/hardhat-toolbox
(4) npm i --save-dev @nomiclabs/hardhat-ethers
(5) npm i --save-dev @nomiclabs/hardhat-waffle
(6) npm i --save-dev ethers
(7) npm i --save-dev ethereum-waffle
(8) npm i --save-dev chai 
```
* To compile the smart contract
```
npx hardhat compile
```
* To list all the test accounts
```
npx hardhat node
```
* To deploy the project
```
npx hardhat run --network localhost scripts/deploy.js
```

## Starting the development server
To start the development server on your local browser, we have to follow these commands
```
cd client
npm start
```
This will open the web page on your browser usually on `localhost:3000` and you can then interact with the various functionalities.
It will open the metamask dialogue box upon starting and you can connect your wallet 

## Usage

You will be able to see your account address on the top and the current balance.
You can interact using the `deposit` and `withdraw` buttons which will deposit and withdraw the given sum of tokens.
You will have to confirm your transaction on your metamask pop-up.

