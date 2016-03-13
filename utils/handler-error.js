
module.exports.onError = function(errcb,cb) {
    return function(err,result) {
        err ? errcb(err,null) : cb(result);
    }
}


module.exports.onErrorNext = function(next,cb) {
    return function(err,result) {
        err ? handlerErrorNext(err,next) : cb(result);
    }
}
function handlerErrorNext(err,next){
    var error = new Error();
    error.status = err;
    next(error);
}


module.exports.onErrorObj = function(obj,finish,cb) {
    return function(err,result) {
        err ? handlerErrorObj(err,obj,finish) : cb(result);
    }
}
function handlerErrorObj(err,obj,finish){
    obj.error = err;
    finish();
}