describe("posting demo data", function() {
    
    var postRequest;
    var newData = {title: 'New Item', description: 'This is a shiny new item'};
    
    beforeEach(module('app'));
    
   it("should call /api/demo with demo data", inject(function($httpBackend, demoData) {
       $httpBackend.whenPOST('/api/v1/demo', function(data){
           postRequest=JSON.parse(data);
           expect(postRequest).to.not.be.empty;
           return true;
       }).respond(200);
       demoData.save(newData);
       $httpBackend.flush();
   })); 
});