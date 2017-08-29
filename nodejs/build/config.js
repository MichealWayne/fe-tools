'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
    src: path.join(__dirname, './templates'),
    dist: path.join(__dirname, '../../pages')
};