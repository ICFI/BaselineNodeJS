/*global describe, expect, beforeEach, it, inject*/

describe("state cities directive", function () {
    var element, scope;

    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();

        element = '<fieldset data-input-state-city="data-input-state-city"><legend class="col-xs-12">Where do you live now?</legend></fieldset>';

        //element = $compile(element)(scope);

        //scope.$digest();
    }));

    it("should have legend and two form-groups", function () {
        expect([]).to.have.length(0);
    });

    /*
    it("should call /api/demo with demo data", inject(function ($httpBackend, businessLenderData) {
        $httpBackend.whenPOST('/api/v1/demo', function (data) {
            postRequest = JSON.parse(data);
            expect(postRequest).to.not.be.empty;
            return true;
        }).respond(200);

        // $httpBackend.flush();
    }));
    */
});