var express = require('express');
var router = express.Router();


//To get the Importer's Customs Home
router.get('/c_ImpView', function (req, res, next) {
    res.render('c_ImpView');
});


//To send the product ID for the product that we need to verify
router.get('/c_ImpVerifications', function (req, res, next) {
    res.render('c_ImpVerifications');
});


//To verify the product
router.post('/c_ImpVerifications1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        reqdata = req.body;
        console.log(reqdata);

        MyContract.methods.setImpCustoms(reqdata._id)
            .send({ from: data1[5], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 10');
                res.render('c_ImpVerificationSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('c_ImpVerificationUnSucc');
            })
    })
});


//To send the product ID for the product details that we need to fetch
router.get('/c_ImpProductDetails', function (req, res, next) {
    res.render('c_ImpProductDetails');
});


//To get Product details
router.post('/c_ImpProductDetails1', function (req, res, next) {
    data = req.body;
    console.log(data);

    MyContract.methods.getInvoiceDetails(data._id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("c_ImpProdDet", { ProdData: val });
        })
});


//To view Importer's customs balance
router.get('/c_ImpViewBalance', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        web3.eth.getBalance(data1[5]).then((val) => {
            var bal = web3.utils.fromWei(val, 'ether');
            console.log(bal);
            res.render("c_ImpViewBalance", { balance: bal });
        })
    })
})


//To send the product ID for the order details that we need to fetch
router.get('/c_ImpOrderDetails', function (req, res, next) {
    res.render('c_ImpOrderDetails');
});


//To get order details
router.post('/c_ImpOrderDetails1', function (req, res, next) {
    db = new sqlite3.Database('./db/orderdb.db');

    sql = 'SELECT * FROM orderDet';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('c_ImpOrderDetailsView', { Data: rows })
    });

});


//To get the Exporter's Customs Home
router.get('/c_ExpView', function (req, res, next) {
    res.render('c_ExpView');
});


//To send the product ID for the product that we need to verify
router.get('/c_ExpVerifications', function (req, res, next) {
    res.render('c_ExpVerifications');
});


//To verify the product
router.post('/c_ExpVerifications1', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        db = new sqlite3.Database('./db/orderdb.db');

        reqdata = req.body;
        console.log(reqdata);

        MyContract.methods.setExpCustoms(reqdata._id)
            .send({ from: data1[4], gas: 6000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                db.run('UPDATE orderDet set o_value = "Yes" where id = 7');
                res.render('c_ExpVerificationSuccess');
            }).on('error', (error) => {
                console.log(error.message);
                res.render('c_ExpVerificationUnSucc');
            })
    })
});


//To send the product ID for the product details that we need to fetch
router.get('/c_ExpProductDetails', function (req, res, next) {
    res.render('c_ExpProductDetails');
});


//To get the product details
router.post('/c_ExpProductDetails1', function (req, res, next) {
    data = req.body;
    console.log(data);

    MyContract.methods.getInvoiceDetails(data._id)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render("c_ExpProdDet", { ProdData: val });
        })
});


//To view the Exporter's customs balance
router.get('/c_ExpViewBalance', function (req, res, next) {
    web3.eth.getAccounts().then((data1) => {
        web3.eth.getBalance(data1[4]).then((val) => {
            var bal = web3.utils.fromWei(val, 'ether');
            console.log(bal);
            res.render("c_ExpViewBalance", { balance: bal });

        })
    })
})


//To send the product ID for the order details that we need to fetch
router.get('/c_ExpOrderDetails', function (req, res, next) {
    res.render('c_ExpOrderDetails');
});


//To get the order details
router.post('/c_ExpOrderDetails1', function (req, res, next) {
    db = new sqlite3.Database('./db/orderdb.db');

    sql = 'SELECT * FROM orderDet';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('c_ExpOrderDetailsView', { Data: rows })
    });
});


module.exports = router;