var expect = require("chai").expect;
var Promise = require("bluebird"); //
var searchData = require("../../server/domain/rest-client-data.js");
var Client = require('node-rest-client').Client;
var bodyParser = require("body-parser");

var options_auth={user:"85cok36t2u",password:"49xswrcbt0"};

var client = new Client(options_auth);

describe("non-refactoried test", function() {

    var oData;
    var oResponse;
    before(function(done){
    args ={
            q:"farm", // data passed to REST method (only useful in POST, PUT or PATCH methods)
          };
        client.get("https://18f-3263339722.us-east-1.bonsai.io/sba/_search?", args, function(data, response){
                    // parsed response body as js object
                    oData = data;
                    // raw response
                    oResponse = response;
                    done();
                })
        });

    it("should able to connect to a known bonsai restful url", function() {
        console.error("foo: " + oData);
       expect(oData.length).to.be.at.least(1);
    });
});

describe("refactored test", function() {
    
    var oData;
    var oResponse;
    //app.use(bodyParser.json());
    before(function(done){
    /* args ={
            q:"farm", // data passed to REST method (only useful in POST, PUT or PATCH methods)
          };
    */
        searchData.doSearch("https://18f-3263339722.us-east-1.bonsai.io/sba/_search?q=federal", "farm")
        .then(function(collection) {
            oData = collection;
            done();
        })
});
    it("should able to connect to a known bonsai restful url");
});