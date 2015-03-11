/*global describe, expect, beforeEach, it, inject*/

describe("demoCtrl", function () {
    var controller,
        scope;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('demoCtrl', {
            $scope: scope
        });
    }));

    it("should have no search criteria", function () {
        expect(scope.searchCriteria).to.empty;
    });

    it("should have no search data", function () {
        expect(scope.searchData).to.empty;
    });

    it("should have no search results", function () {
        expect(scope.searchResults).to.empty;
    });

    it("sets assistance dropdown to 3 options", function () {
        expect(scope.assistanceOptions).to.have.length(3);
    });

    it("selects first option of assistance dropdown", function () {
        expect(scope.assistance.value).to.equal('');
    });

    it("sets industry dropdown to 3 options", function () {
        expect(scope.industryOptions).to.have.length(1);
    });

    it("selects first option of industry dropdown", function () {
        expect(scope.industry.value).to.equal('');
    });

    it("sets state dropdown to 3 options", function () {
        expect(scope.stateOptions).to.have.length(1);
    });

    it("selects first option of state dropdown", function () {
        expect(scope.state.value).to.equal('');
    });

    it("updates industry dropdown when assistance selected", function () {
        scope.assistance = {
            'name'  : 'Grants',
            'value' : 'grants'
        };
        scope.$digest();

        expect(scope.industryOptions).to.have.length(5);
    });

    it("updates state dropdown after assistance and industry selected", function () {
        scope.assistance = {
            'name'  : 'Grants',
            'value' : 'grants'
        };
        scope.$digest();

        scope.industry = {
            'name'  : 'Agriculture',
            'value' : 'agriculture'
        };
        scope.$digest();

        expect(scope.stateOptions).to.have.length(3);
    });
});