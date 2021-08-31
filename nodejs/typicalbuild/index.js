const fs = require('fs');
const FS = require('../base/lib/fs/fsFuncs');
const Tip = require('../base/lib/util/tip');
const { getTimeStr } = require('../base/lib/util/util');

const path = require('path');

const Typicalinit = {
  getFolder: config => {
    switch (config) {
      case 'g+w':
      case 'gulp+webpack':
        return 'gulp+webpack';
      case 'w':
      case 'webpack':
        return 'webpack';
	  case 'w+t':
      case 'webpack+ts':
        return 'webpack+ts';
      case 'v':
      case 'vue':
        return 'vue';
      case 'r':
      case 'react':
        return 'react';
      default:
        return null;
    }
  },

  init: ({ name, type, dirname }) => {
    console.log({
      name,
      type,
      dirname,
    });
    name = name || getTimeStr().replace(/\//g, '').split(' ')[0];
    type = Typicalinit.getFolder(type);
    if (!type) {
      Tip.error('Error!找不到对应目录.Cannot find folder.');
      return false;
    }

    const _folder = path.join(dirname, name);
    const _srcfolder = path.join(__dirname, type);
    FS.mkdirsSync(_folder);

    FS.travelFolderSync(
      _srcfolder,
      filepath => {
        const _path = filepath.replace(_srcfolder, _folder);
        const readStream = fs.createReadStream(filepath);
        const writeStream = fs.createWriteStream(_path);

        readStream.pipe(writeStream);
        Tip.log(`mkfile: ${_path}`);
      },
      folderpath => {
        const _path = folderpath.replace(_srcfolder, _folder);
        FS.mkdirsSync(_path);
        Tip.log(`mkdir: ${_path}`);
      }
    );

    if (type === 'vue') {
      // vue
      Tip.warn('vue project need vue-cli 3+.');
    }

    Tip.safe(`
result: ${name}目录已创建.(${type})

now you can start project as:
	cd ${name}
	npm i
	npm run start
		`);
  },
};

module.exports = Typicalinit;
