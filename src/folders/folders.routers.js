const express = require('express');
const router = express.Router();
const controllers = require('./folders.controllers');

router
    .get('/', controllers.getAllForm)
    .post('/', controllers.addNewForm)
    .patch('/:folderId', controllers.update)
    .delete('/:folderId', controllers.remove)
;

module.exports = router;