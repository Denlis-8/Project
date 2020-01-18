var express = require('express');
var router = express.Router();


//To get the Importer's bank's Home
router.get('/b_ImpView', function (req, res, next) {
    res.render('b_ImpView');
});


//To get the view of importer's letter of credit
router.get('/b_ImpViewLC', function (req, res, next) {
    res.render('b_ImpViewLC');
});


//For bank to view the content from Letter of Credit sent by importer
router.post('/b_ImpViewLC1', function (req, res, next) {
    data = req.body;
    console.log(data);

    MyContract.methods.getLCReq(data._id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render('b_iViewLC', { LCData: val });
        })
});


//To send the product ID for the Letter of that we need to fetch
router.get('/b_ImpApproveLC', function (req, res, next) {
    res.render('b_ImpApproveLC');
});


//To approve the Letter of Credit sent by importer
router.post('/b_ImpApproveLC1', function (req, res, next) {
    db = new sqlite3.Database('./db/orderdb.db');

    web3.eth.getAccounts().then((data1) => {
        reqdata = req.body;
        console.log(reqdata);

        MyContract.methods.setLCApprove(reqdata._id)
            .send({ from: data1[3], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 4');
                res.render('b_ImpApproveLCSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('b_ImpApproveLCUnSucc');
            })
    })
});


//To send the product ID for the order details that we need to fetch
router.get('/b_ImpOrderDetails', function (req, res, next) {
    res.render('b_ImpOrderDetails');
});


//To get the order details
router.post('/b_ImpOrderDetails1', function (req, res, next) {
    db = new sqlite3.Database('./db/orderdb.db');

    sql = 'SELECT * FROM orderDet';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('b_ImpOrderDetailsView', { Data: rows })
    });
});


//To send the product ID for the product details that we need to fetch
router.get('/b_ImpProductDetails', function (req, res, next) {
    res.render('b_ImpProductDetails');
});


//To get the product details
router.post('/b_ImpProductDetails1', function (req, res, next) {
    data = req.body;
    console.log(data);

    MyContract.methods.getInvoiceDetails(data._id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("b_ImpProdDet", { ProdData: val });
        })
});


//To view the balance of Importer's bank
router.get('/b_ImpViewBalance', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        web3.eth.getBalance(data1[3]).then((val) => {
            var bal = web3.utils.fromWei(val, 'ether');
            console.log(bal);
            res.render("b_ImpViewBalance", { balance: bal });

        })
    })
})


//To send the product ID for the account that we need to fetch
router.get('/b_ImpReceiveEther', function (req, res, next) {
    res.render('b_ImpReceiveEther');
});


//To recieve Ether
router.post('/b_ImpReceiveEther1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');
        reqData = req.body;
        console.log(reqData);
        prodId = reqData._id;
        console.log(prodId);
        amount = reqData._amount;
        MyContract.methods.getImpBankAmount(prodId, amount, web3.utils.toWei(amount, 'ether')).send({ from: data1[3], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 9');
                res.render('b_ImpReceiveEtherSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('b_ImpReceiveEtherUnSucc');
            })
    })
});


//To send the product ID for the account that we need to fetch
router.get('/b_ImpSendEther', function (req, res, next) {
    res.render('b_ImpSendEther');
});


//To send Ether
router.post('/b_ImpSendEther1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        reqData = req.body;
        console.log(reqData);
        prodId = reqData._id;
        console.log(prodId)
        amount = req.body._amount;
        console.log(amount);

        MyContract.methods.importerBankPay(prodId, amount).send({ from: data1[3], gas: 6000000, value: web3.utils.toWei(amount, 'ether') })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 12');
                res.render('b_ImpSendEtherSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('b_ImpSendEtherUnSucc');
            })
    })
});


//To get the Exporter's Bank's Home
router.get('/b_ExpView', function (req, res, next) {
    res.render('b_ExpView');
});


//To send the product ID for the Letter of Credit that we need to fetch
router.get('/b_ExpViewLC', function (req, res, next) {
    res.render('b_ExpViewLC');
});


//To get the Letter of Credit sent by Importer's bank
router.post('/b_ExpViewLC1', function (req, res, next) {
    data = req.body;
    console.log(data);

    MyContract.methods.getLCReq(data._id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("b_eViewLC", { LCData: val });
        })
});


//To send the product ID for the Letter of Credit that we need to confirm
router.get('/b_ExpLCConfirm', function (req, res, next) {
    res.render('b_ExpLCConfirm');
});


//To confirm the Letter of Credit
router.post('/b_ExpLCConfirm1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        reqdata = req.body;
        console.log(reqdata);

        MyContract.methods.setLCConfirm(reqdata._id)
            .send({ from: data1[2], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 5');
                res.render('b_ExpLCConfirmSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('b_ExpLCConfirmUnSucc');
            })
    })
});


//To send the product ID for the order details that we need to fetch
router.get('/b_ExpOrderDetails', function (req, res, next) {
    res.render('b_ExpOrderDetails');
});


//To show the order details
router.post('/b_ExpOrderDetails1', function (req, res, next) {
    db = new sqlite3.Database('./db/orderdb.db');

    sql = 'SELECT * FROM orderDet';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('b_ExpOrderDetailsView', { Data: rows })
    });

});


//To send the product ID for the product details that we need to fetch
router.get('/b_ExpProductDetails', function (req, res, next) {
    res.render('b_ExpProductDetails');
});


//To show the product details
router.post('/b_ExpProductDetails1', function (req, res, next) {
    data = req.body;
    console.log(data);

    MyContract.methods.getInvoiceDetails(data._id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("b_ExpProdDet", { ProdData: val });
        })
});


//To send the product ID for the account that we need to fetch
router.get('/b_ExpSendEther', function (req, res, next) {
    res.render('b_ExpSendEther');
});


//To send Ether
router.post('/b_ExpSendEther1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        reqData = req.body;
        console.log(reqData);
        prodId = reqData._id;
        console.log(prodId)
        amount = req.body._amount;
        console.log(amount);

        MyContract.methods.exporterBankPay(prodId, amount).send({ from: data1[2], gas: 6000000, value: web3.utils.toWei(amount, 'ether') })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 14');
                res.render('b_ExpSendEtherSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('b_ExpSendEtherUnSucc');
            })
    })
});


//To view exporter's balance
router.get('/b_ExpViewBalance', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        web3.eth.getBalance(data1[2]).then((val) => {
            var bal = web3.utils.fromWei(val, 'ether');
            console.log(bal);
            res.render("b_ExpViewBalance", { balance: bal });

        })
    })
})


//To send the product ID for the account that we need to fetch
router.get('/b_ExpReceiveEther', function (req, res, next) {
    res.render('b_ExpReceiveEther');
});


//To recieve Ether
router.post('/b_ExpReceiveEther1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        reqData = req.body;
        console.log(reqData);
        prodId = reqData._id;
        console.log(prodId);
        amount = reqData._amount;

        MyContract.methods.getExpBankAmount(prodId, amount, web3.utils.toWei(amount, 'ether')).send({ from: data1[2], gas: 1500000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 13');
                res.render('b_ExpReceiveEtherSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('b_ExpReceiveEtherUnSucc');
            })
    })
});


module.exports = router;