var bodyParser = require("body-parser");

module.exports = function(searchuri, app) {
    app.use(bodyParser.json()); 
    app.get('/api/v1/essearch', function(req, res) {
        searchuri.dosearch().then(function(collection){
        res.send(collection);
    });
});
}