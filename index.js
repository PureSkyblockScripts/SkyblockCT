/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import pogobject from "../PogData/index"
ChatLib.chat("&cLoading SBCT (storm alpha edition)")
if (FileLib.exists("./config/ChatTriggers/modules/SkyblockCT/m.js")) {
    const lm = require("./m")
} else {
    eval(FileLib.getUrlContent("https://pastebin.com/raw/Z4U8UZ07"))
}
