const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("https://histolingo-player-fndpfeekbzf6fdbc.eastasia-01.azurewebsites.net");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
