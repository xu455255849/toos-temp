#!/usr/bin/env node
const path = require('path');
const os = require('os');
const shell = require('shelljs');

const USER_ROOT = os.homedir();

let file = path.join(__dirname, '../yps-business');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}
shell.rm('-rf', USER_ROOT + '/Documents/work/qiniu/static/yunxi/yps-business');
shell.cp('-rf', file, USER_ROOT + '/Documents/work/qiniu/static/yunxi');

shell.echo('拷贝成功,开始上传cdn...');

shell.rm('-rf', USER_ROOT + '/.qshell/qupload');

shell.echo('remove qshell folder');
shell.cd( USER_ROOT + '/Documents/work/qiniu');

if (shell.exec('./qshell qupload 1 upload.conf').code == 0) {
  shell.echo('Upload failed！');
  shell.exit(1)
}
