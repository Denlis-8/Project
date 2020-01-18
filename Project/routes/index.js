var express = require('express');
var router = express.Router();


//To get start page
router.get('/', function (req, res, next) {
    let db = new sqlite3.Database('./db/orderdb.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error(err.message);
        }

        db.run('CREATE TABLE orderDet(id INTEGER PRIMARY KEY,o_value TEXT NOT NULL)');

        db.close();
    })

    res.render('index');
});


//To get the Home page
router.get('/indexx1', function (req, res, next) {
    res.render('indexx');
});
router.get('/contact', function (req, res, next) {
    res.render('contact');
});
router.get('/about', function (req, res, next) {
    res.render('about');
});


//Initializing Database
router.post('/indexx', function (req, res, next) {
    db = new sqlite3.Database('./db/orderdb.db');
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [1, 'No'], function (err) {
        console.log("test1")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [2, 'No'], function (err) {
        console.log("test2")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [3, 'No'], function (err) {
        console.log("test3")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [4, 'No'], function (err) {
        console.log("test4")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [5, 'No'], function (err) {
        console.log("test5")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [6, 'No'], function (err) {
        console.log("test6")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [7, 'No'], function (err) {
        console.log("test7")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [8, 'No'], function (err) {
        console.log("test8")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [9, 'No'], function (err) {
        console.log("test9")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [10, 'No'], function (err) {
        console.log("test10")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [11, 'No'], function (err) {
        console.log("test11")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [12, 'No'], function (err) {
        console.log("test12")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [13, 'No'], function (err) {
        console.log("test13")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [14, 'No'], function (err) {
        console.log("test14")
    })
    db.run('INSERT INTO orderDet(id, o_value) VALUES(?,?)', [15, 'No'], function (err) {
        console.log("test15")
    })

    res.render("indexx");
});


module.exports = router;