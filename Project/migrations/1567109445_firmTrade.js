const firmTrade = artifacts.require("firmTrade");
module.exports = function(deployer) {
    // Use deployer to state migration tasks.
    web3.eth.getAccounts().then((data1) => {
        deployer.deploy(firmTrade, data1[0], data1[1], data1[2], data1[3], data1[4], data1[5]);
    })
};