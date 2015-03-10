var bodyParser = require("body-parser");

module.exports = function(searchuri, app) {
    app.use(bodyParser.json()); 
    app.get('/api/v1/essearch', function(req, res) {
        searchuri.doSearch('https://18f-3263339722.us-east-1.bonsai.io/sba/_search', 'farm')
        .then(function(collection) {
            res.send(collection);
        });
    });
}
