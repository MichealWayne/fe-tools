## page build

## Version

1.1.3

## Usage
```js
`const build = require('build');
build.init();`
```
## Api
```js
`build.init({
    src: ...,   // {String} modules path, optional;
    dist: ...   // {String} output path, optional;
	callback: (folder, page) => {	// {Function} callback, @param {String} folder: folder name;@param {String} page: page name;
		...			
	}
});`
```
## Path

config: config.js;
steps config: lib/process/step.js;
modules src: templates/;
components src: components/;

## Author

Micheal Wang

## Update time

2017.08.29

## github

<https://github.com/MichealWayne/work/tree/master/nodejs/build>