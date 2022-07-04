// handle database edit operations
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

router.get('/library/add', function(req, res, next) {
    let lib = editJsonFile('./database/library.json');
    let template = {...lib.get('0')};
    for (const key in template) template[key] = typeof(template[key]);
    res.render('libraryAdd', {
        ...renderVar,
        template: template,
        description: lib.get('0')
    });
});

module.exports = router;
