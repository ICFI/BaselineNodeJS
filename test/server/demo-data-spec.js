var expect = require("chai").expect;
var mongoose = require('mongoose');
var jobModel = require('../../server/models/Demo');
var Promise = require("bluebird");
var demoData = require("../../server/domain/demo-data.js");

function resetStuff() {
    return new Promise( function (resolve, reject) {
        mongoose.connection.collections["demos"].drop(resolve, reject);
    })
}

// mongodb://<dbuser>:<dbpassword>@ds051831.mongolab.com:51831/generic_node
//mongodb://localhost/generic_node
/*
describe("db demo data test", function() {
 
    var stuff;
    
    before(function(done){
         demoData.connectDb('mongodb://localhost/generic_node')
        .then(resetStuff)
        .then(demoData.seedStuff)
        .then(demoData.findStuff)
        .then(function(collection) {
            stuff=collection;
            done();
        });         
    });
    
    after(function(){
        mongoose.connection.close();
    });

    it("should never be empty since demo data are seeded", function() {
        stuff.length
        expect(stuff.length).to.be.at.least(1);
    });
    
    it("should have a demo data (stuff) with a title", function(){
        expect(stuff[0].title).to.not.be.empty;
    });
    
    it("should have a demo data (stuff) with a description", function(){
        expect(stuff[0].description).to.not.be.empty;
    });

    
});
*/
/*
describe("db save demo data (aka stuff)", function(){
    var stuff = {title:'Demo Title', description:'This is a mock record'};
    var stuffs;
    
    function saveTestStuff() {
        return demoData.saveStuff(stuff);
    }
    
    before(function(done) {
         demoData.connectDb('mongodb://localhost/generic_node')
        .then(resetStuff)
        .then(function() { return demoData.saveStuff(stuff)})
        .then(demoData.findStuff)
        .then(function setStuff(collection) {
            stuffs=collection;
            done();
        });         
    });
    
    after(function(){
        mongoose.connection.close();
    });
    
    it("should have one demo data (aka stuff) after saving one object", function() {
       expect(stuffs).to.have.length(1); 
    });

});
*/
/*
describe("db get demo data (aka stuff)", function(){
    it("should be able to get a single record");
    it("should be able to get a list of all records");
    it("should be able to get a list of records based on criteria");
});

describe("db update demo data (aka stuff)", function(){
    ("it should be able to change the data of a single record and save to the database");
});

describe("db delete demo data (aka stuff)", function(){
    ("it should be able to change the data of a single record and save to the database");
});
*/