// Modules to control application life and create native browser window
const { app, BrowserWindow, nativeImage } = require("electron");
const { join } = require("path");
const colors = require("../src/assets/colors");

const getPlatformIcon = () => {
  let icon;
  switch (process.platform) {
    case 'win32': icon = join(__dirname, 'icon.ico'); break;
    case 'darwin': icon = join(__dirname, 'icon.icns'); break;
    case 'linux': icon = join(__dirname, 'icon.png'); break;
  }

  return nativeImage.createFromPath(icon)
}


const defaultWindowOptions = {
  width: 1200, // 820
  height: 600,
  icon: getPlatformIcon(),
  titleBarStyle: "hidden",
  titleBarOverlay: {
    color: colors["primary"],
    symbolColor: colors["title-text"]
  },
  webPreferences: {
    preload: join(__dirname, "preload.ts"),
    scrollBounce: true
  }
};

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow(defaultWindowOptions);

  // Only windows with the `about:blank` url will be created.
  // All other urls will be blocked.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        fullscreenable: false,
        titleBarStyle: "hidden",
        titleBarOverlay: {
          color: colors["primary"],
          symbolColor: colors["title-text"]
        }
      }
    };
  });

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.setZoomFactor(1);
  });

  // Load Web App
  if (app.isPackaged) {
    // From live url
    mainWindow.loadURL("https://task-manager-nine-lemon.vercel.app/#/");

    // From local dist
    // mainWindow.loadFile(join(__dirname, '../dist/index.html/'))
  }
  else {
    // Development
    mainWindow.loadURL("http://127.0.0.1:5173");

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
