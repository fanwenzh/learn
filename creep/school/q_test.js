var Q = require('q');
var defer = Q.defer();

function getInputPromise() {
    return defer.promise;
}

var outputPromise = getInputPromise().then(null,function(rejected){
    console.log('start');
    return 'rejected';
});

outputPromise.then(function(fulfilled){
    console.log('fulfilled: ' + fulfilled);
},function(rejected){
    console.log('rejected: ' + rejected);
});

defer.resolve('inputpromise fulfilled');