const { join } = require("path")

module.exports = {
  electronPackagerConfig: {
    icon: join(__dirname, "./src/assets/maskable_icon_x512.ico"),
    platform: "all"
  },
  makers: [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "task_manager"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin"
      ]
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ]
}