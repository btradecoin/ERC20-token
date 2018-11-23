const token = artifacts.require("../contracts/MyToken.sol");
const crowdsale = artifacts.require("../contracts/MyCrowdsale.sol");

module.exports = function (deployer) {
  const openingTime = 1542509000; // 15 Июня 2018
  const closingTime = 1561939200; // 1 Июля 2019
  const rate = new web3.BigNumber(1); // 1 токен за 1 эфир
  const wallet = '0x281055afc982d96fab65b3a49cac8b878184cb16'; // Кошелек-бенефициар
  const cap = 200 * 1000000; // Хардкеп
  const goal = 100 * 1000000; // Софткеп

  return deployer
    .then(() => {
      return deployer.deploy(token);
    })
    .then(() => {
      return deployer.deploy(
        crowdsale,
        openingTime,
        closingTime,
        rate,
        wallet,
        cap,
        token.address,
        goal
      );
    })
    .then(() => {
      // Crowdsale должен владеть токеном
      var tokenContract = web3.eth.contract(token.abi).at(token.address);
      web3.eth.defaultAccount = web3.eth.accounts[0];
      tokenContract.transferOwnership(crowdsale.address);
    });
};
