#!/usr/bin/env node
const path = require('path');
const shell = require('shelljs');


let file = path.join(__dirname, '/yunke');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}
shell.rm('-rf', '/Users/xushaoping/Documents/work/qiniu/static/yunxi/yunke');
shell.cp('-rf', file, '/Users/xushaoping/Documents/work/qiniu/static/yunxi');

shell.echo('拷贝成功,开始上传cdn...');

shell.rm('-rf', '/Users/xushaoping/.qshell/qupload');

shell.echo('remove qshell folder');
shell.cd('/Users/xushaoping/Documents/work/qiniu');

if (shell.exec('./qshell qupload 1 upload.conf').code == 0) {
  shell.echo('Upload failed！');
  shell.exit(1)
}
