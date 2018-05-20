const express = require('express');
const router = express.Router();
const foldersController = require('./folders.controller');

router
    .get('/', foldersController.getFoldersTree)
    .get('/:folderId', foldersController.getFolder)
    .post('/', foldersController.addFolder)
    .patch('/:folderId', foldersController.updateFolder)
    .delete('/:folderId', foldersController.removeFolder)
;

module.exports = router;