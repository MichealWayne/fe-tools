#!/usr/bin/env node

'use strict';
const argv = require('../base').Env;
const builder = require('../index');
const { version } = require('../package.json');
const Config = {
  version,
  time: '2019.01.09',
};

// version
if (argv.v || argv.version) {
  console.log(`v${Config.version}`);
}

// server
else if (argv.s || argv.server) {
  builder.server(argv.p || argv.port, argv.dirname, argv.proxy);
}

// img init
else if (argv.m || argv.image) {
  builder.imginit(argv.config, null, null, null, argv.pc);
}

// get base64 string
else if (argv.base64) {
  builder.imginit(argv.config, argv.base64, argv.type);
} else if (argv.webp) {
  builder.imginit(argv.config, null, null, argv.webp);
}

// typical init
else if (argv.t || argv.typical) {
  builder.typicalinit(argv.name, argv.t || argv.typical);
}

// document
else if (argv.doc) {
  builder.documentinit();
}

// help
else {
  console.log(
    [
      'usage: cli [operate] [params]',
      '',
      'options:',
      '    -h   --help    help',
      '    -m   --image   handle image(mobile first)',
      '    --   --pc      handle image(pc)',
      '    --   --base64  get base64 image str',
      '    --   --webp    get webp image',
      '    -t   --typical typical task init',
      '    -s   --serve   easy http proxy',
      '    -v   --version look version',
      '         --doc     look document',
    ].join('\n')
  );
  process.exit();
}
