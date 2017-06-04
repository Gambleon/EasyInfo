const path = require('path');

module.exports = {
	path: path,
	baseDir: baseDir,
	extDir: extDir,
	libDir: libDir,
	appDir: appDir,
	dir: dir,
	ext: ext,
	lib: requireLib,
}

function baseDir() { return __basedir; }
function extDir() {	return dir('ext'); }
function libDir() { return dir('lib'); }
function appDir() { return dir('app'); }
function dir(dir) { return path.join(baseDir(), dir); }
function ext(name) { return path.join(extDir(), name + '.js'); }
function lib(name) { return path.join(libDir(), name + '.js'); }
function requireLib(name) { return require(lib(name)); }