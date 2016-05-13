var mysql      = require('mysql');
var request = require("request");
var _ = require("lodash");
var Q = require("q");
var webSettings = require("./webSetting");

function CustomerServ(){

    this.url = webSettings.mySqlURL;

    console.log("Customer Service : ", this.url);
}

CustomerServ.prototype = {

    getAllCustomers: function (req) {

        console.log("Customer SERVE : getAllCustomer() ");

        var deferred = Q.defer();

        var uri = this.url; // [this.url,this.flags].join('?');

        var requestOptions = {
            method: "GET",
            uri: uri
        };

        var connection = mysql.createConnection({
            host: this.url,
            user: webSettings.mySqlUser,
            port: webSettings.mySqlPort,
            password: webSettings.mySqlPassword,
            database: webSettings.mySqlDatabase
        });

        connection.connect();

        //connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        connection.query('SELECT * from customers', function (err, rows, fields) {
            if (err) {
                //throw err;
                deferred.reject(err);
            }
            console.log('The solution is: ', rows);
            deferred.resolve(rows);
        });

        connection.end();

        return deferred.promise;
    },

    getCustomer: function (customerID) {

        console.log("Customer SERVE : getAllCustomer() ");

        var deferred = Q.defer();

        var uri = this.url; // [this.url,this.flags].join('?');

        var requestOptions = {
            method: "GET",
            uri: uri
        };

        var connection = mysql.createConnection({
            host: this.url,
            user: webSettings.mySqlUser,
            port: webSettings.mySqlPort,
            password: webSettings.mySqlPassword,
            database: webSettings.mySqlDatabase
        });

        connection.connect();

        //connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        connection.query('select * from customers where customerNumber=' + customerID, function (err, rows, fields) {
            if (err) {
                //throw err;
                deferred.reject(err);
            }
            console.log('The solution is: ', rows);
            deferred.resolve(rows);
        });

        connection.end();

        return deferred.promise;


    },

    updateCustomer:function(req){

        //update customers set customerName=?, addressLine1=?, city=? where customerNumber = ?

        console.log("Customer SERVE : getAllCustomer() ");

        var deferred = Q.defer();

        var uri = this.url; // [this.url,this.flags].join('?');

        var requestOptions = {
            method: "GET",
            uri: uri
        };


        var connection = mysql.createConnection({
            host     : this.url,
            user     : webSettings.mySqlUser,
            port 	   :  webSettings.mySqlPort,
            password : webSettings.mySqlPassword,
            database : webSettings.mySqlDatabase
        });

        connection.connect();


        connection.query('update customers set customerName="' + req.body.customerName + '", addressLine1="'+ req.body.addressLine1 + '", city="' + req.body.city+ '" where customerNumber = ' + req.body.customerNumber, function(err, rows, fields) {
            if (err) {
                //throw err;
                deferred.reject(err);
            }
            console.log('The solution is: ', rows);
            deferred.resolve(rows);
        });

        connection.end();

        return deferred.promise;

    }
}

module.exports = new CustomerServ();