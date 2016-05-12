/**
 * Created by afirdousi on 3/16/16.
 */
var _ = require("lodash");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var webSetting = require("./server/service/webSetting");


var app     = express();
var port    = process.env.PORT || webSetting.portNumber;
var basePath = __dirname;
console.log("Web setting using build :", webSetting.useBuild);
var assetsPath = webSetting.useBuild? "/dist":"/src";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log(basePath + assetsPath);

app.use(webSetting.contextRoot, express.static(basePath + assetsPath));
//
//console.log("Result of path resolve : " + path.resolve(basePath,assetsPath,"index.html"));
//
//var renderIndex = function(req,res){
//    res.sendFile(path.resolve(basePath,assetsPath,"index.html"));
//};
//
//
//app.get("/*",renderIndex);


// App Level Routes
////////////////////////////////////////////////////////////////////////////

// sample route with a route the way we"re used to seeing it
app.get("/echo", function(req, res) {
  res.send("this is a sample!");
});

//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/profile',function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});


// Middleware
////////////////////////////////////////////////////////////////////////////

var router = express.Router();

//Logging
require("./server/middleware/logger")(router);

//Authentication
require("./server/middleware/auth")(app,router,webSetting);

//SJSU Mobile API
require("./server/middleware/customer")(app,router,webSetting);


// apply the routes to our application
app.use("/sjsu/api/", router);

//Basic error handling
app.use(function(req, res) {
  if(req.path === "/") {
    res.redirect(webSetting.contextRoot);
  }
  else {
    console.log("Path not found: " + req.path);
    res.status(404);
    res.type('txt').send('Not found');
  }
});


// START THE SERVER
// ==============================================
app.listen(port, function () {
  console.log("Magic happens on port " + port);
});








