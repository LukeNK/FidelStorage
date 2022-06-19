var express = require('express');
var router = express.Router();

const editJsonFile = require("edit-json-file");
let db = {
    storage: editJsonFile('../database/storage'),
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Fidelissma Storage System' });
});

router.get('/search', function(req, res, next) {
    res.render('search', {title: 'Search FSS', query: 'Minecraft item, coordinate, or book'})
});
router.post('/search', function(req, res, next) {
    let query = req.body.query, type = req.body.type;
    res.render('search', {title: 'Search FSS', query: (query || 'Minecraft item, coordinate, or book')})
});

module.exports = router;
