app = angular.module('app', ['ngResource']);

angular.module('app').controller('demoCtrl', function($scope, $resource, demoData) {
    $scope.demoData=$resource('/api/v1/demo').query();
    
    
    $scope.submit = function(){
        var item = {title:$scope.title, description:$scope.description};
        demoData.save(item);
        $scope.title='';
        $scope.description='';
        $scope.demoData.push(item);
    }
});