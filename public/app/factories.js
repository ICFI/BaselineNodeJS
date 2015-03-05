app.factory('demoData', ['$resource', function($resource){
    return $resource('/api/v1/demo/');
}])