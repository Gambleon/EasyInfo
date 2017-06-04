const electron = require('electron');

module.exports = {
    client: {
        send: function (channel, data) {
            electron.ipcRenderer.send(channel, data);
        },
        receive: function (channel, callback) {
            electron.ipcRenderer.on(channel, function (event, parameter) {
                callback(parameter);
            });
        }
    },
    server: {
        setWindow: setWindow,
        send: send,
        receive: receive
    }
}

let window;

function setWindow(mainWindow) {
    window = mainWindow;
}

function send(channel, data) {
    window.webContents.send(channel, data);
}

function receive(channel, callback) {
    electron.ipcMain.on(channel, function (event, parameter) {
        callback(parameter);
    })
}