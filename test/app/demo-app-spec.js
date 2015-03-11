/*global describe, expect, beforeEach, it, inject*/

describe("posting demo data", function () {
    var postRequest,
        newData = {title: 'New Item', description: 'This is a shiny new item'};

    beforeEach(module('app'));

    it("should call /api/demo with demo data", inject(function ($httpBackend, businessLenderData) {
        $httpBackend.whenPOST('/api/v1/demo', function (data) {
            postRequest = JSON.parse(data);
            expect(postRequest).to.not.be.empty;
            return true;
        }).respond(200);

        // $httpBackend.flush();
    }));
});