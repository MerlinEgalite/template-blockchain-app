pragma solidity ^0.6.8;

contract Invest {
	address payable public investor;

	modifier onlyInvestor() {
		require(
				msg.sender == investor,
				"Only buyer can call this."
		);
		_;
	}

	event Invested();

}