// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract SecureBanking {
    address private contractOwner;
    mapping(address => uint256) private accountBalances;

    constructor() {
        contractOwner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the contract owner can perform this action");
        _;
    }

    function withdraw(uint256 amount) external payable {
        require(accountBalances[msg.sender] >= amount, "Insufficient Balance");
        accountBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function deposit() external payable {
        accountBalances[msg.sender] += msg.value;
    }

    function getAccountBalance() external view returns (uint256) {
        return accountBalances[msg.sender];
    }

    function getContractOwner() external view returns (address) {
        return contractOwner;
    }

    function setContractOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        contractOwner = newOwner;
    }
}
