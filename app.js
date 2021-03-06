const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 1200px
    width: 1000,
    // Set the initial height to 800px
    height: 800,
    // set the title bar style
    titleBarStyle: 'hidden-inset',
    // set the background color to black
    backgroundColor: "#111",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    // Set icon for application -- Icon made by SmashIcons from https://www.flaticon.com/authors/smashicons
    icon: path.join(__dirname, "assets/icons/png/analytics64.png")
  })

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.once('ready-to-show', () => {
    window.setMenu(null)
    window.show()
  })
})