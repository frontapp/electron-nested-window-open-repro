const { app, BrowserWindow } = require("electron");

app.allowRendererProcessReuse = true;
app.enableSandbox();

function didCreateWindow(newWindow) {
  // Uncommenting this fixes the issue.
  delete newWindow.webContents.browserWindowOptions.webContents;

  newWindow.webContents.on("did-create-window", didCreateWindow);
}

app.once("ready", () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: true,
      nativeWindowOpen: true,
    },
  });
  window.loadFile("index.html");
  didCreateWindow(window);
});
