const { app, BrowserWindow, ipcMain } = require("electron");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 460,
        height: 420,
        resizable: false,
        frame: false,
        transparent: false,
        backgroundColor: "#d6eeff",
        hasShadow: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

ipcMain.on("close-app", () => {
    app.quit();
});

ipcMain.on("minimize-app", () => {
    win.minimize();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});