const express = require('express');
const router = express.Router();
const foldersController = require('./folders.controller');

router
    .get('/', foldersController.getFolderTree)
    .post('/', foldersController.addFolder)
    .patch('/:folderId', foldersController.updateFolder)
    .delete('/:folderId', foldersController.removeFolder)
;

module.exports = router;