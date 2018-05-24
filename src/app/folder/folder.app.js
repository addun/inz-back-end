const asyncHandler = require('express-async-handler');
const express = require('express');
const app = express();
const folderService = require('./folder.service');


app.get('/', asyncHandler(async function (req, res) {
    const forms = await folderService.getFoldersTree();
    res.send(forms);
}));

app.post('/', asyncHandler(async function (req, res) {
    const folderData = req.body;
    const folder = await folderService.addFolder(folderData);
    res.send(folder);
}));

app.get('/:folderId', asyncHandler(async function (req, res) {
    const folderId = req.params['folderId'];
    const folder = await folderService.getFolder(folderId);
    res.send(folder);
}));

app.put('/:folderId', asyncHandler(async function (req, res) {
    const folderId = req.params['folderId'];
    const folderData = req.body;
    const folder = await folderService.updateFolder(folderId, folderData);
    res.send(folder);
}));

app.delete('/:folderId', asyncHandler(async function (req, res) {
    const folderId = req.params['folderId'];
    const folder = await folderService.removeFolder(folderId);
    res.send(folder);
}));

module.exports = app;