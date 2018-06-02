const fs = require('fs');
const FS = require('../base/lib/fs/fsFuncs');
const Tip = require('../base/lib/util/tip');
const getTimeStr = require('../base/lib/util/util').getTimeStr;

const path = require('path');

let Typicalinit = {
    getFolder: config => {
        switch (config) {
            case 'g+w':
            case 'gulp+webpack': return 'gulp+webpack'; break;

            case 'w':
            case 'webpack': return 'webpack'; break;
			case 'test': return 'test'; break;
            default: return null
        }
    },

    init: ({
            name,
            type,
            dirname
        } = options) => {
        name = name || getTimeStr().replace(/\//g, '').split(' ')[0];
        type = Typicalinit.getFolder(type);
        if (!type) {
            Tip.error('Error!找不到对应目录.Cannot find folder.');
            return false;
        }

        let _folder = path.join(dirname, name);
        let _srcfolder = path.join(__dirname, type);
        FS.mkdirsSync(_folder);

        FS.travelFolderSync(_srcfolder, filepath => {
            let _path = filepath.replace(_srcfolder, _folder);
            let readStream = fs.createReadStream(filepath);
            let writeStream = fs.createWriteStream(_path);

            readStream.pipe(writeStream);
            Tip.safe(`mkfile: ${_path}`);
        }, folderpath => {
            let _path = folderpath.replace(_srcfolder, _folder);
            FS.mkdirsSync(_path);
            Tip.safe(`mkdir: ${_path}`);
        });

        Tip.safe(`result: ${name}目录已创建.(${type})`);
    }
};


module.exports = Typicalinit;