var express = require("express");
var app = express();
var expect = require("chai").expect;
var request = require("supertest");
var Promise = require("bluebird");

var dataSavedStuff;

//We're testing the service layer, so just mock the db.  
//Note - should look into more robut mock framework...
var db = {
   findStuff: function(){
      return new Promise( function(resolve, reject) {
         resolve([{title:'Service Demo', description:'This is a test record from the service layer'}]);
      });
   },
   saveStuff: function(item) {
      dataSavedStuff=item;
   }
};

var stuffService = require("../../server/services/demo-service")(db, app);

var newStuff = {title:'Service Demo', description:'This is a test record from the service layer'};

describe("service get demo data (aka stuff)", function() {
   it("get should return a json list of demo data", function(done){
   request(app).get('/api/v1/demo')
   .expect('Content-Type', /json/)
   .end(function(err, res){
      expect(res.body).to.be.a('Array');
      done();
      });
   });
});

describe("service save demo data (aka stuff)", function() {
   it("should validate that title is greater than 4 characeters");
   /*
   , function(done){
      request(app).post('/api/v1/demo').send(newStuff).end(function(err, res) {
         expect(dataSavedStuff.title.length).to.be.at.least(4);
         done();
      });  
   }
   */

   it("should valicate that title is less than 40 characters");
   it("should validate that description is greater than 4 characeters");
   it("should valicate that description is less than 250 characters");
   

   
   it("should pass the stuff to the database save", function(done){
       request(app).post('/api/v1/demo').send(newStuff).end(function(err, res) {
           expect(dataSavedStuff).to.deep.equal(newStuff);
           done();
       });
       
   });
   it("should return a status of 200 to the front end if the database saved");
   it("should return a stuff with an id");
   it("should return an error if the database failed");
});