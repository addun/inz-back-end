const boom = require('boom');
const FoldersModel = require('./folders.model');

async function getFoldersTree() {
    return new Promise((resolve, reject) => {
        FoldersModel.getChildrenTree(null, {}, function (err, tree) {
            if (err) {
                reject(err);
            }
            resolve(tree);
        });
    });
}

async function getFolder(folderId) {
    const folder = await FoldersModel.findById(folderId).exec();
    if (folder) {
        return folder
    } else {
        throw boom.notFound(`Form with ID '${folderId}' didn't found`);
    }
}

async function addFolder(folderData) {
    try {
        let folder = new FoldersModel(folderData);
        return await folder.save();
    } catch (e) {
        throw boom.badRequest('Validation error', e);
    }
}

async function removeFolder(folderId) {
    const folder = await getFolder(folderId);
    await folder.remove();
    return folder;
}

async function updateFolder(folderId, folderData) {
    await getFolder(folderId);

    await FoldersModel.findByIdAndUpdate(folderId,
        {$set: folderData},
        {new: true}).exec();

    return await getFolder(folderId);
}

module.exports = {
    getFoldersTree: getFoldersTree,
    getFolder: getFolder,
    addFolder: addFolder,
    removeFolder: removeFolder,
    updateFolder: updateFolder
};