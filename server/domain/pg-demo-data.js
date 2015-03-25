var pg = require('pg');
var Promise = require("bluebird");

//stuff is just used because this is a generic demo - 
//  in a real app, it should be named a meaningful name

var findStuff = function(query) {
    return Promise.cast(mongoose.model('Demo').find(query).exec());    
}

//var createStuff = Promise.promisify(Stuff.create, Stuff);

//EXPORTS
exports.findStuff = findStuff;
//wrap third party function with promise.
//Params, function, object reference
exports.connectDb = Promise.promisify(pg.connect, pg);

//exports.saveStuff = createStuff;

exports.seedStuff = function() {

        return findStuff({}).then(function(collection){
            if(collection.length === 0 ) {
                return Promise.map(demoStuff, function(stuff){
                    return createStuff(stuff);
                });
            }
        });
};

//SEED DATA
var demoStuff = [
    {title:'Demo 1', description:'Description 1'},
    {title:'Demo 2', description:'Description 2'},
    {title:'Demo 3', description:'Description 3'},
    {title:'Demo 4', description:'Description 4'}
    ];