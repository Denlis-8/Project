var express = require('express');
var router = express.Router();


//To get Exporter's Home
router.get('/e_View', function (req, res, next) {
    res.render('e_View');
});


//To send the product ID for the Invoice that we need to confirm
router.get('/e_ConfirmInvoice', function (req, res, next) {
    res.render('e_ConfirmInvoice');
});


//For exporter to confirm invoice
router.post('/e_ConfirmInvoice1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');
        data = req.body;
        console.log(data);

        MyContract.methods.setProdConfirm(data._id)
            .send({ from: data1[0], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 2');
                res.render('e_ConfirmInvoiceSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('e_ConfirmInvoiceUnSucc');
            })
    })
});


//To send the product ID for the product that we need to fetch
router.get('/e_ConfirmSend', function (req, res, next) {
    res.render('e_ConfirmSend');
});


//To confirm the sending of product from Exporter to Exporter's Customs
router.post('/e_ConfirmSend1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        data = req.body;
        console.log(data);

        MyContract.methods.setItemSend(data._id)
            .send({ from: data1[0], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 6');
                res.render('e_ConfirmSendSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('e_ConfirmSendUnSucc');
            })
    })
});


//To send the product ID for the order details that we need to fetch
router.get('/e_OrderDetails', function (req, res, next) {
    res.render('e_OrderDetails');
});


//To get the order details
router.post('/e_OrderDetails1', function (req, res, next) {
    db = new sqlite3.Database('./db/orderdb.db');

    sql = 'SELECT * FROM orderDet';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('e_OrderDetailsView', { Data: rows })
    });
});


//To view Exporter's balance
router.get('/e_ViewBalance', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        web3.eth.getBalance(data1[0]).then((val) => {
            var bal = web3.utils.fromWei(val, 'ether');
            console.log(bal);
            res.render("e_ViewBalance", { balance: bal });
        })
    })
})


//To send the product ID for the product details that we need to fetch
router.get('/e_ProductDetails', function (req, res, next) {
    res.render('e_ProductDetails');
});


//To get the product details
router.post('/e_ProductDetails1', function (req, res, next) {
    data = req.body;
    console.log(data);

    MyContract.methods.getInvoiceDetails(data._id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("e_ProdDet", { ProdData: val });
        })
});


//To send the product ID for the account that we need to fetch
router.get('/e_ReceiveEther', function (req, res, next) {
    res.render('e_ReceiveEther');
});


//To recieve Ether
router.post('/e_ReceiveEther1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        reqData = req.body;
        console.log(reqData);
        prodId = reqData._id;
        console.log(prodId);
        amount = reqData._amount;
        MyContract.methods.getExpAmount(prodId, amount, web3.utils.toWei(amount, 'ether')).send({ from: data1[0], gas: 1500000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 15');
                res.render('e_ReceiveEtherSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('e_ReceiveEtherUnSucc');
            })
    })
});


//To get Importer's Home
router.get('/i_View', function (req, res, next) {
    res.render('i_View');
});


//To send the product ID for the product that we need to confirm
router.get('/i_ConfirmReceive', function (req, res, next) {
    res.render('i_ConfirmReceive');
});


//For Importer to confirm the recieval of the product sent from Exporter
router.post('/i_ConfirmReceive1', function (req, res, next) {

    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        data = req.body;
        console.log(data);

        MyContract.methods.setItemReceive(data._id)
            .send({ from: data1[1], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 11');
                res.render('i_ConfirmReceiveSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('i_ConfirmReceiveUnSucc');
            })
    })
});


//To get the invoice creation Page
router.get('/i_InvoiceCreate', function (req, res, next) {
    res.render('i_InvoiceCreate');
});


//To create Invoice
router.post('/i_InvoiceCreate1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        data = req.body;
        console.log("data", data);

        MyContract.methods.setInvoiceDetails(data._id, data._name, data._impName, data._impAdd, data._expName, data._expAdd, data._ppu, data._nou)
            .send({ from: data1[1], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 1');
                res.render('i_InvoiceSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('i_InvoiceUnSucc');
            })
    })
});


//To get the Letter of Request creation page
router.get('/i_LCReq', function (req, res, next) {
    res.render('i_LCReq');
});


//To create the Letter of Request
router.post('/i_LCReq1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        reqdata = req.body;
        console.log(reqdata);

        MyContract.methods.setLCReq(reqdata._id, reqdata._impBankName, reqdata._impBankAdd, reqdata._expBankName, reqdata._expBankAdd, reqdata._amount)
            .send({ from: data1[1], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 3');
                res.render('i_LCReqSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('i_LCReqUnSucc');
            })
    })
});


//To send the product ID for the order details that we need to fetch
router.get('/i_OrderDetails', function (req, res, next) {
    res.render('i_OrderDetails');
});


//To get order details
router.post('/i_OrderDetails1', function (req, res, next) {
    db = new sqlite3.Database('./db/orderdb.db');

    sql = 'SELECT * FROM orderDet';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('i_OrderDetailsView', { Data: rows })
    });
});


//To view Importer's balance
router.get('/i_ViewBalance', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        web3.eth.getBalance(data1[1]).then((val) => {
            var bal = web3.utils.fromWei(val, 'ether');
            console.log(bal);
            res.render("i_ViewBalance", { balance: bal });
        })
    })
})


//To send the product ID for the product details that we need to fetch
router.get('/i_ProductDetails', function (req, res, next) {
    res.render('i_ProductDetails');
});


//To get product details
router.post('/i_ProductDetails1', function (req, res, next) {
    data = req.body;
    console.log(data);

    MyContract.methods.getInvoiceDetails(data._id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("i_ProdDet", { ProdData: val });
        })
});


//To send the product ID for the account that we need to fetch
router.get('/i_SendEther', function (req, res, next) {
    res.render('i_SendEther');
});


//To send Ether
router.post('/i_SendEther1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        reqData = req.body;
        console.log(reqData);
        prodId = reqData._id;
        console.log(prodId)
        amount = reqData._amount;
        console.log(amount);

        MyContract.methods.importerPay(prodId, amount).send({ from: data1[1], gas: 6000000, value: web3.utils.toWei(amount, 'ether') })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 8');
                res.render('i_SendEtherSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('i_SendEtherUnSucc');
            })
    })
});


module.exports = router;