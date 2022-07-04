// handle read operations
var express = require('express');
var router = express.Router();
const createError = require('http-errors');

const editJsonFile = require("edit-json-file");
function getDatabase() {
    return {
        storage: editJsonFile('./database/storage.json'),
        library: editJsonFile('./database/library.json'),
    }
}

// Default render
const renderVar = {
    title: 'Fidelissma Storage System',
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { ...renderVar, title: 'Fidelissma Storage System' });
});

router.get('/guide', function (req, res, next) {
    res.render('guide', {...renderVar, title: 'FSS guide'});
})

router.get('/search', function(req, res, next) {
    res.render('search', {...renderVar, title: 'Search FSS', query: 'Name or ID'})
});
router.post('/search', function(req, res, next) {
    let query = req.body.query.toLowerCase(), type = req.body.type, items = [];
    let db = getDatabase()[type];
    if (!type || !db) return next(createError(404)); // To error handle
    for (const key in db.get()) {
        let item = db.get()[key];
        let iName = item.name.toLowerCase();
        if ((key.toString() != query)
            && (iName.toLowerCase() != query)
            && (!iName.split(' ').includes(query))
            && (!iName.split('_').includes(query))
            && (item?.displayName?.toLowerCase() != query)
            && (!item?.displayName?.toLowerCase()?.split(' ')?.includes(query))
            && (item?.id != query)) continue;
        items.push({...item, id:key}); // Push with ID
    }
    res.render('search', {
        ...renderVar,
        title: 'Search FSS',
        query: (query || 'Name or ID'),
        database: type,
        ans: items.length? items : null,
    });
});

router.get('/item/:database', function(req, res, next) {
    let type = req.params.database;
    let db = getDatabase()[type], id = req.query.id;
    if (!db) return next(createError(404));
    res.render('item', {
        ...renderVar,
        item: db.get()[id],
        database: type
    });
})

module.exports = router;
