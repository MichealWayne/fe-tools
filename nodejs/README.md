## ijijin-cli

[npm-ijijinCli](https://www.npmjs.com/package/ijijin-cli)

## Version
0.9.3

## update info:
- 2019.02.14: update typeicalbuild.

## Install
``` sh
	npm install -g ijijin-cli
```

## Usage


### 1.easy server
``` sh
	ijijin -s
```
or 
``` sh
	ijijin --server
```

browser: http://localhost:8443/

#### params
- port(p): listen port(default:8443);
- dirname: listen dirname

#### example
``` sh
	ijijin -s -p 3000 --dirname D:/
```

#### proxy.config.js
if folder has 'proxy.config.js', the proxy can add interfaces(Array) from the file.
as
``` sh
	// proxy.config.js
	module.exports = {
		target: 'http://www.npm.com',
		urls: [
			'/public/Activity/',
			'/nodetest/'
		]
	}
```


### 2.image build
format image file to webp and blur base64 string.
If fs system find the render HTML file, it will replace `ijijin-img="..."` to `src="{{blured base64 image}}" data-format="{{image format}}" data-original="{{image path}}"`

*need gm and **[ImageMagick](http://www.imagemagick.org/script/download.php)**

``` sh
    ijijin -m
```
or
``` sh
    ijijin --image
```

#### params
- config: config file (default: img.config.js).(optional)
- pc: handle pc rendered HTML file.

#### example
``` sh
    ijijin -m --config src/img.config.js
```

#### \* html image load render

if root directory has 'index.html', imageBuilder will render image label which has 'ijijin-img' attribute.

for example

before:
``` html
	<img ijijin-img="images/01.base64" />
```

after:
``` html
	<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAABMCAMAAAARIrRIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFo6Oj8vLy5OTk6urq1dXVvLy8wsLC+Pj4tLS0mZmZz8/Pra2tn5+f3d3dyMjI////YQ+hcQAAAitJREFUeNrsl8sSpCAMRQmvkID4/387ICqg2GpXzWJqOgtL1APkEhIU81cmftjfxVT0goSP8g2mHG3m1GOMiYKVOKO0gYgfYjaNAes9GCL7CEtjxb7JDzB17D4SqXvMk799csYkkbx/dMLMoGtP5g4TpAciiRsMRv4nlfAaAxNyXOAJg/w4GBhisEAUBotb4izACDNkUjxdYPOMphWmYiFP7xrrX4kP7/pX6/V/wgLBRwzGSn65biCuogRKlAi4iMkMmmFKStBFTF4aivttOsx//otkPsoJ99gUuvz3DEuyj0T6hHEQWVv7rlDJZbG8fFnfltWKr8uiyph6X021EPp3UvgnMOmmQz7YCjgPMPQR17OFOgQYr9nEDDBw5PP3GIg3K5/7sgH4WGPF1m1Qa/Sutu83u5TmeprqfNNCpeBNrSmnAAyunolk6s5skzhgi4eZ4HyJTfqQswpir8wnDKbFf0tT2qGtAqW7C0zTpIsqbsYiLMhkKnVkqkxH36hMxBDv2YOLBBBllanH9KLkjC6lgUi2uCI3CeQyS7dgtsEKBVxyoqXA2PrSYlyxmKk0Eoni+5TWyagRhi2mfe7cmxqQ2gdsMe+cC5TvuPUNZW8wYzdJm9wUZ0xSbzyPfTththmLn2Pc5fEW09M3mCauy/0YC+QR9uDS68bbMcfV7I6lQ4LH7tdCPlFSNjUn+cjb+eNOyan7jyiRWzHgtvz1rX3f5V30qwFX9keAAQB9xdgkMNNdNgAAAABJRU5ErkJggg==" data-format="png" data-original="images/01" />
```

- src: base64 blured image;
- data-format: original image format;
- data-original: original image path;

#### get base64 string
example
``` sh
    ijijin --base64 logo.png
```

if you want to change image type, add type argument
``` sh
    ijijin --base64 logo.png --type jpg
```

#### get webp image
example
``` sh
    ijijin --webp logo.png
```


### 3.typical project build
init typical project folder and core files.

``` sh
    ijijin -t {tasktype}
```
or
``` sh
    ijijin --typical {tasktype}
```

default folder name: Time string.

#### param
- name: folder name;

#### types
- v/vue: vue project;
- r/react: react project;
- w/webpack: webpack project(no frame, with zepto);
- g+w/gulp+webpack: gulp+webpack project(no frame, with zepto);


#### command
run development:
``` sh
	npm run start
```

run build:
``` sh
	npm run build
```

run production:
``` sh
	npm run build:prod
```

#### example
``` sh
    ijijin -t webpack --name 2018test
```

## Author
Micheal Wayne

## Update time

2019.02.14
