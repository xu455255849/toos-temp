#!/usr/bin/env node

var shell = require('shelljs');

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

shell.rm('-rf', '/Users/xushaoping/.qshell/qupload');

shell.echo('remove qshell folder');
shell.cd('/Users/xushaoping/Documents/work/qiniu');

if (shell.exec('./qshell qupload 1 upload.conf').code == 0) {
    shell.echo('Upload failed！');
    shell.exit(1)
}
