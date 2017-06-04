const path = require('path');

global.__basedir = path.join(__dirname, '/..');
global.__paths = path.join(__basedir, 'lib/paths.js');
const paths = require(__paths);

const extensions = require(path.join(paths.appDir(), 'extensions.js'));
const ipc = paths.lib('ipc').server;

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', function () {
	mainWindow = new BrowserWindow({ width: 1024, height: 786, minWidth: 1024, minHeight: 786, backgroundColor: '#f0f0f0', show: true });
	mainWindow.loadURL('file://' + __basedir + '/app/index.html');

	var extensionData = null;

	extensions.extensions(function (extData) {
		extensionData = extData;
		ipc.send('set-list', extData);
	});

	ipc.setWindow(mainWindow);

	mainWindow.webContents.on('did-finish-load', () => {
		ipc.send('set-list', extensionData);
	});

	ipc.receive('get-content', function (parameter) {
		if (typeof parameter === 'undefined' || parameter === null) {
			ipc.send('set-content', 'undefined: parameter is undefined');
			return;
		}
		if (parameter.length < 2) {
			ipc.send('set-content', 'undefined: parameter.length < 2');
			return;
		}
		var i = 0;
		var current = extensionData;
		if (typeof current === 'undefined') {
			ipc.send('set-content', 'undefined: extensionData is undefined');
			return;
		}
		while (i < parameter.length - 1) {
			current = current.find(function (data) {
				return data.categoryId === parameter[i];
			});
			if (typeof current === 'undefined') {
				ipc.send('set-content', 'undefined: categoryId ' + parameter[i] + ' not found');
				return;
			}
			if (++i >= parameter.length - 1) {
				break;
			}
			else
			{
				current = current.categories;
			}
		}
		current = current.items.find(function (data) {
			return data.itemId === parameter[i];
		});
		if (typeof current !== 'undefined') {
			ipc.send('set-content', current.content());
		} else {
			ipc.send('set-content', 'undefined: itemId ' + parameter[i + 1] + ' not found');
		}
		/*extensionData.categories.forEach(function (category) {
			if (category.categoryId === parameter.categoryId) {
				category.items.forEach(function (item) {
					if (item.itemId === parameter.itemId) {
						ipc.send('set-content', item.getContent());
					}
				});
			}
		});*/
		//console.log('ipc.receive(\'get-content\', callback)');
	});

	mainWindow.on('closed', () => { mainWindow = null });
});