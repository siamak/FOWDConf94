## The Future of Web Design Conf (1394) Teh.
![FOWDConf94](https://www.dropbox.com/s/y67ea7edjqrar6l/FOWDConf94-cover.jpg?raw=1)

[**FOWDConf94**](http://conf.wsschool.org/fowd/) an event for Designers and Front–End Developers. Designed, Maintained by [**Siamak Mokhtari**](http://siamak.us) for [WSSCHOOL](http://wsschool.org). Held by WSSCHOOL and [Majid Online](http://majidonline.com) at October 7th 2015 in Tehran, Iran.

This repository have source code project of FOWDConf94 (Tehran). It has [Jade](http://jade-lang.com) for Template Engine. [SCSS](http://sass-lang.com) ([libsass](https://github.com/sass/libsass)
compiler) for Stylesheets. [jQuery](http://jquery.com) for javascript library and [Grunt](http://gruntjs.com/) for building tool.

***
## How to use
First clone this project with Git:

```
git clone https://github.com/siamakmokhtari/FOWDConf94.git
```


Simply Run two–tasks with gruntjs. Before run tasks, install npm dependencies with
```
[sudo] npm install
```

After Setup dependencies use ```grunt build``` (for Build and Watch files) and use ```grunt browser``` (for Browsersync)

### Modify

If you need to modify the CSS, modify the SCSS source located at ```dev/sass/styles.scss``` and compile SCSS file to CSS. 🌺

All of the contents build by Jade and data provided with ```all.json``` located at ```dev/data/all.json``` (If you need to modify data, change specific json file, like sponsors.json and compile project with grunt) 🎁

# License
Copyright (c) 2015 Siamak Mokhtari. Licensed under [MIT](http://siamak.mit-license.org).

```
The MIT License (MIT)

Copyright (c) 2015 Siamak Mokhtari s.mokhtari75@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
