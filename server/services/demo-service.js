var bodyParser = require("body-parser");

module.exports = function(db, app) {
    app.use(bodyParser.json()); 
    app.post('/api/v1/demo', function(req, res) {
        db.saveStuff(req.body);
        res.end();
    });
    app.get('/api/v1/demo', function(req, res) {
        db.findStuff().then(function(collection){
        res.send(collection);
    });
});
}