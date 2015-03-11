var bodyParser = require("body-parser");

var primaryUri = '';

module.exports = function(searchProxy, app) {
    app.use(bodyParser.json()); 
    app.get('/api/v1/essearch/:queryparams', function(req, res) {;
        var q = req.params.queryparams
        searchProxy.doSearch('https://18f-3263339722.us-east-1.bonsai.io/sba/_search', req.params.queryparams)
        .then(function(collection) {
            res.send(collection);
        });
    });
}
