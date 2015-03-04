var expect = require("chai").expect;
var mongoose = require('mongoose');
var jobModel = require('../../server/models/Demo');
var Promise = require("bluebird");
var demoData = require("../../server/data/demo-data.js");

function resetStuff() {
    return new Promise( function (resolve, reject) {
        mongoose.connection.collections["Demo"].drop(resolve, reject);
    })
}

describe("db demo data", function() {
  /*  
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
    
    it("should never be empty since jobs are seeded", function() {
        expect(stuff.length).to.be.at.least(1);
    });
    
    it("should have a job with a title", function(){
        expect(stuff[0].title).to.not.be.empty;
    });
    
    it("should have a job with a description", function(){
        expect(stuff[0].description).to.not.be.empty;
    });
    */
    /**/
     it("should never be empty since demo data are seeded");
     it("should always have a title");
    
});

describe("db save jobs", function(){
    var job = {title:'Demo Title', description:'This is a mock record'};
    var jobs;
/*    
    function saveTestJob() {
        return jobsData.saveJob(job);
    }
    
    before(function(done) {
         jobsData.connectDb('mongodb://localhost/jobfinder')
        .then(resetJobs)
        .then(function() { return jobsData.saveJob(job)})
        .then(jobsData.findJobs)
        .then(function setJobs(collection) {
            jobs=collection;
            done();
        });         
    });
    
    after(function(){
        mongoose.connection.close();
    });
    
    it("should have one job after saving one job", function() {
       expect(jobs).to.have.length(1); 
    });
    */
    
    it("should have one item after saving one demo record");
});
