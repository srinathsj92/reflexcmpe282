var mysql      = require('mysql');
var request = require("request");
var _ = require("lodash");
var Q = require("q");
var webSettings = require("./webSetting");

function OrderServ(){

    this.url = webSettings.mySqlURL;

    console.log("Customer Service : ", this.url);
}

OrderServ.prototype = {

    getOrderByCustomer:function(customerID){

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

        //connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        connection.query('select * from orders where customerNumber=' + customerID, function(err, rows, fields) {
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



};

module.exports = new OrderServ();