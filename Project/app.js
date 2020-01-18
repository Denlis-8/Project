var createError = require('http-errors');
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require("web3");
var MyContractJSON = require(path.join(__dirname, 'build/contracts/firmTrade.json'))
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
sqlite3 = require('sqlite3').verbose();

contractAddress = MyContractJSON.networks['4002'].address;

console.log(contractAddress);

// get abi
const abi = MyContractJSON.abi;

// creating contract object
MyContract = new web3.eth.Contract(abi, contractAddress);

web3.eth.getAccounts().then((data) => {
    console.log(data);;
});


coinbase = "0xdcdb1942c6507a6b370d15ee4a1e64a6c681309e";
console.log(coinbase);


var indexRouter = require('./routes/index');
var firmRouter = require('./routes/Firm');
var bankRouter = require('./routes/Bank');
var customsRouter = require('./routes/Customs');
// var usersRouter = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/firm', firmRouter);
app.use('/bank', bankRouter);
app.use('/customs', customsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;