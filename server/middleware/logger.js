/**
 * Created by afirdousi on 4/5/16.
 */
module.exports = function(router){

    router.use(function(req, res, next) {
        console.log("NEW Logging Request...");
        console.log(req.method, req.url);
        next();
    });
};



