const express = require('express');
const router = express.Router();
const controllers = require('./folders.controllers');

router
    .get('/', controllers.getAll)
    .get('/:folderId/tree', controllers.getChildrenTree)

    .post('/', controllers.addNew)

    .delete('/:folderId', controllers.removeChild)
;

module.exports = router;