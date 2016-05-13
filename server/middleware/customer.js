/**
 * Created by afirdousi on 3/28/16.
 */
var _ = require("lodash");
var customerServ = require("../service/customer");
var orderServ = require("../service/order");


module.exports = function(app,router,webSetting){

    //Get all customer
    router.get("/customer", function(req,res,next) {

        customerServ.getAllCustomers()
            .then(function(result){

                res.json(result);
            })
            .catch(function(err){
                next(err);
            });

    });

    router.get("/customer/:customerID", function(req,res,next) {

        customerServ.getCustomer(req.params.customerID)
            .then(function(result){

                res.json(result);
            })
            .catch(function(err){
                next(err);
            });

    });

    router.get("/customer/:customerID/orders", function(req,res,next) {

        orderServ.getOrderByCustomer(req.params.customerID)
            .then(function(result){

                res.json(result);
            })
            .catch(function(err){
                next(err);
            });

    });

    router.post("/customer", function(req,res,next) {

        console.log("POST : /customer with body :", req.body);
        console.log("Calling updateCustomer()...");

        customerServ.updateCustomer(req)
            .then(function(result){

                res.json(result);
            })
            .catch(function(err){
                next(err);
            });

    });


};