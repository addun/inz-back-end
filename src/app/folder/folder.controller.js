const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const folderService = require('./folder.service');


router.get('/', asyncHandler(async function (req, res) {
    const forms = await folderService.getFoldersTree();
    res.send(forms);
}));

router.post('/', asyncHandler(async function (req, res) {
    const folderData = req.body;
    const folder = await folderService.addFolder(folderData);
    res.send(folder);
}));

router.get('/:folderId', asyncHandler(async function (req, res) {
    const folderId = req.params['folderId'];
    const folder = await folderService.getFolder(folderId);
    res.send(folder);
}));

router.put('/:folderId', asyncHandler(async function (req, res) {
    const folderId = req.params['folderId'];
    const folderData = req.body;
    const folder = await folderService.updateFolder(folderId, folderData);
    res.send(folder);
}));

router.delete('/:folderId', asyncHandler(async function (req, res) {
    const folderId = req.params['folderId'];
    const folder = await folderService.removeFolder(folderId);
    res.send(folder);
}));


module.exports = router;
