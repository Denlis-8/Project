const json = artifacts.require("firmTrade");
let accounts, trade, admin, CurrentContractBalance, ContractBalance, tradeAddress;

const interface = json['abi'];
const bytecode = json['bytecode'];



contract('firmTrade', () => {
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    admin = accounts[6];
    trade = await new web3.eth.Contract(interface)
      .deploy({
        data: bytecode,
        arguments: [accounts[0], accounts[1], accounts[2], accounts[3], accounts[4], accounts[5]]
      })
      .send({ from: admin, gas: '6000000' });
    tradeAddress = await trade.options.address;

  })

  //To deploy a contract
  it('deploys a contract', async () => {
    tradeAdd = await trade.options.address;
    assert.ok(tradeAdd, 'Test failed!!');
  })

  //To Create Invoice
  it('invoice details added', async () => {
    productId = 1;
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;

    try {
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      tradeInvoiceDetails = await trade.methods.getInvoiceDetails(productId).call();
      assert.equal(tradeInvoiceDetails[0], productName, "Test failed!!!");
      assert.equal(tradeInvoiceDetails[1], importerName, "Test failed!!!");
      assert.equal(tradeInvoiceDetails[2], importerAddr, "Test failed!!!");
      assert.equal(tradeInvoiceDetails[3], exporterName, "Test failed!!!");
      assert.equal(tradeInvoiceDetails[4], exporterAddr, "Test failed!!!");
      assert.equal(tradeInvoiceDetails[5], productQuantity, "Test failed!!!");
      assert.equal(tradeInvoiceDetails[6], pricePerUnit, "Test failed!!!");
      assert.equal(tradeInvoiceDetails[7], totalPrice, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //To confirm the Invoice
  it('Confirm Invoice details added', async () => {
    productId = 1;
    e_confirmOrder = 1;
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;

    try {
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      tradeOrderDetails = await trade.methods.getOrderDetails(productId).call();
      assert.equal(tradeOrderDetails[1], e_confirmOrder, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //To Request the Letter of Credit
  it('LC Request Details Added', async () => {
    productId = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;

    try {
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      tradeLCReqDetails = await trade.methods.getLCReq(productId).call();
      assert.equal(tradeLCReqDetails[0], productName, "Test failed!!!");
      assert.equal(tradeLCReqDetails[1], importerName, "Test failed!!!");
      assert.equal(tradeLCReqDetails[2], importerBankName, "Test failed!!!");
      assert.equal(tradeLCReqDetails[3], importerBankAddr, "Test failed!!!");
      assert.equal(tradeLCReqDetails[4], exporterName, "Test failed!!!");
      assert.equal(tradeLCReqDetails[5], exporterBankName, "Test failed!!!");
      assert.equal(tradeLCReqDetails[6], exporterBankAddr, "Test failed!!!");
      assert.equal(tradeLCReqDetails[7], totalPrice, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Approves the letter of crefit
  it('Approve LC Request added', async () => {
    productId = 1;
    bi_approveLC = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;

    try {
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      tradeOrderDetails = await trade.methods.getOrderDetails(productId).call();
      assert.equal(tradeOrderDetails[3], bi_approveLC, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //To confirm Letter of credit
  it('Confirm LC Request added', async () => {
    productId = 1;
    be_confirmLC = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;

    try {
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      tradeOrderDetails = await trade.methods.getOrderDetails(productId).call();
      assert.equal(tradeOrderDetails[4], be_confirmLC, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Exporter sends the product to Exporter's customs
  it('Item Send by Exporter added', async () => {
    productId = 1;
    e_itemSend = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;

    try {
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      tradeOrderDetails = await trade.methods.getOrderDetails(productId).call();
      assert.equal(tradeOrderDetails[5], e_itemSend, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Exporter Customs Verification
  it('Exporter Customs Verification added', async () => {
    productId = 1;
    ce_verification = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;

    try {
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });
      tradeOrderDetails = await trade.methods.getOrderDetails(productId).call();
      assert.equal(tradeOrderDetails[6], ce_verification, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Fund is transfered by Importer to Importer's bank
  it('Fund Transfer by Importer added', async () => {
    productId = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;

    try {
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });

      amount = web3.utils.toWei((totalPrice).toString(), 'ether')

      await trade.methods.importerPay(productId, totalPrice).send({ from: accounts[1], value: amount, gas: 6000000 });
      CurrentContractBalance = await web3.eth.getBalance(tradeAddress);
      console.log('Current Balance : ', CurrentContractBalance);
      assert.equal(CurrentContractBalance, amount, "Test Failed!!")

    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Fund is Received by Importer's Bank
  it('Fund Receival by Importer Bank added', async () => {
    productId = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;
    weiPrice = "20000000000000000000";

    try {
      amount = web3.utils.toWei((totalPrice).toString(), 'ether');
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });
      await trade.methods.importerPay(productId, totalPrice).send({ from: accounts[1], value: amount, gas: 6000000 });
      await trade.methods.getImpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[3], gas: 6000000 });
      CurrentContractBalance = await web3.eth.getBalance(tradeAddress);
      console.log('Current Balance : ', CurrentContractBalance);
      assert.equal(CurrentContractBalance, 0, "Test Failed!!")
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Importer's customs verifies the product sent to them
  it('Importer Customs Verification added', async () => {
    productId = 1;
    ci_verification = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;
    weiPrice = "20000000000000000000"

    try {
      amount = web3.utils.toWei((totalPrice).toString(), 'ether');
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });
      await trade.methods.importerPay(productId, totalPrice).send({ from: accounts[1], value: amount, gas: 6000000 });
      await trade.methods.getImpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setImpCustoms(productId).send({ from: accounts[5], gas: 6000000 });
      tradeOrderDetails = await trade.methods.getOrderDetails(productId).call();
      assert.equal(tradeOrderDetails[7], ci_verification, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Importer receives the Product
  it('Item Receival by Importer added', async () => {
    productId = 1;
    i_itemReceive = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;
    weiPrice = "20000000000000000000"

    try {
      amount = web3.utils.toWei((totalPrice).toString(), 'ether');
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });
      await trade.methods.importerPay(productId, totalPrice).send({ from: accounts[1], value: amount, gas: 6000000 });
      await trade.methods.getImpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setImpCustoms(productId).send({ from: accounts[5], gas: 6000000 });
      await trade.methods.setItemReceive(productId).send({ from: accounts[1], gas: 6000000 });
      tradeOrderDetails = await trade.methods.getOrderDetails(productId).call();
      assert.equal(tradeOrderDetails[8], i_itemReceive, "Test failed!!!");
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Fund is transfered from Importer's bank to Exporter's bank
  it('Fund Transfer by Importer Bank added', async () => {
    productId = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;
    weiPrice = "20000000000000000000"

    try {
      amount = web3.utils.toWei((totalPrice).toString(), 'ether')
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });
      await trade.methods.importerPay(productId, totalPrice).send({ from: accounts[1], value: amount, gas: 6000000 });
      await trade.methods.getImpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setImpCustoms(productId).send({ from: accounts[5], gas: 6000000 });
      await trade.methods.setItemReceive(productId).send({ from: accounts[1], gas: 6000000 });

      await trade.methods.importerBankPay(productId, totalPrice).send({ from: accounts[3], value: amount, gas: 6000000 });
      CurrentContractBalance = await web3.eth.getBalance(tradeAddress);
      console.log('Current Balance : ', CurrentContractBalance);
      assert.equal(CurrentContractBalance, amount, "Test Failed!!")
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Fund is received by Exporter's bank
  it('Fund Receival by Exporter Bank added', async () => {
    productId = 1;
    be_fundReceive = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;
    weiPrice = "20000000000000000000";
    try {
      amount = web3.utils.toWei((totalPrice).toString(), 'ether')
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });
      await trade.methods.importerPay(productId, totalPrice).send({ from: accounts[1], value: amount, gas: 6000000 });
      await trade.methods.getImpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setImpCustoms(productId).send({ from: accounts[5], gas: 6000000 });
      await trade.methods.setItemReceive(productId).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.importerBankPay(productId, totalPrice).send({ from: accounts[3], value: amount, gas: 6000000 }); await trade.methods.getExpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[2], gas: 6000000 });
      CurrentContractBalance = await web3.eth.getBalance(tradeAddress);
      console.log('Current Balance : ', CurrentContractBalance);
      assert.equal(CurrentContractBalance, 0, "Test Failed!!")
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Fund is transfered from Exporter's bank to Exporter
  it('Fund Transfer by Exporter Bank added', async () => {
    productId = 1;
    be_fundTransfer = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;
    weiPrice = "20000000000000000000";

    try {

      amount = web3.utils.toWei((totalPrice).toString(), 'ether')
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });
      await trade.methods.importerPay(productId, totalPrice).send({ from: accounts[1], value: amount, gas: 6000000 });
      await trade.methods.getImpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setImpCustoms(productId).send({ from: accounts[5], gas: 6000000 });
      await trade.methods.setItemReceive(productId).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.importerBankPay(productId, totalPrice).send({ from: accounts[3], value: amount, gas: 6000000 });
      await trade.methods.getExpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[2], gas: 6000000 });


      await trade.methods.exporterBankPay(productId, totalPrice).send({ from: accounts[2], value: amount, gas: 6000000 });
      CurrentContractBalance = await web3.eth.getBalance(tradeAddress);
      console.log('Current Balance : ', CurrentContractBalance);
      assert.equal(CurrentContractBalance, amount, "Test Failed!!")
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })

  //Exporter recieves the fund
  it('Fund Receival by Exporter added', async () => {
    productId = 1;
    importerBankName = "ICICI";
    importerBankAddr = "0x3E1B4C107D214998F6d17Ae316dbD42F99B6521B";
    exporterBankName = "BARCLAYS";
    exporterBankAddr = "0x6B8DC825D9FE29938688BeE9B1889611e1570CA7";
    productName = "Laptops";
    importerName = "Shine";
    importerAddr = "0xeFdAb28a73F81668539A529D21eD353F4aE9bCA9";
    exporterName = "Apple";
    exporterAddr = "0xA5063a46169E2B613a1114839d7Ec79490DAf8b6";
    productQuantity = 10;
    pricePerUnit = 2;
    totalPrice = 20;
    weiPrice = "20000000000000000000";

    try {
      amount = web3.utils.toWei((totalPrice).toString(), 'ether');
      await trade.methods.setInvoiceDetails(productId, productName, importerName, importerAddr, exporterName, exporterAddr, productQuantity, pricePerUnit).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setProdConfirm(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setLCReq(productId, importerBankName, importerBankAddr, exporterBankName, exporterBankAddr, totalPrice).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.setLCApprove(productId).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setLCConfirm(productId).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.setItemSend(productId).send({ from: accounts[0], gas: 6000000 });
      await trade.methods.setExpCustoms(productId).send({ from: accounts[4], gas: 6000000 });
      await trade.methods.importerPay(productId, totalPrice).send({ from: accounts[1], value: amount, gas: 6000000 });
      await trade.methods.getImpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[3], gas: 6000000 });
      await trade.methods.setImpCustoms(productId).send({ from: accounts[5], gas: 6000000 });
      await trade.methods.setItemReceive(productId).send({ from: accounts[1], gas: 6000000 });
      await trade.methods.importerBankPay(productId, totalPrice).send({ from: accounts[3], value: amount, gas: 6000000 });
      await trade.methods.getExpBankAmount(productId, totalPrice, weiPrice).send({ from: accounts[2], gas: 6000000 });
      await trade.methods.exporterBankPay(productId, totalPrice).send({ from: accounts[2], value: amount, gas: 6000000 });
      await trade.methods.getExpAmount(productId, totalPrice, weiPrice).send({ from: accounts[0], gas: 6000000 });
      CurrentContractBalance = await web3.eth.getBalance(tradeAddress);
      console.log('Current Balance : ', CurrentContractBalance);
      assert.equal(CurrentContractBalance, 0, "Test Failed!!")
    } catch (err) {
      assert(err);
      console.log(err);
    }
  })
})