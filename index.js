/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
ChatLib.chat("&cLoading SBCT (storm alpha edition)")
if (FileLib.exists("./config/ChatTriggers/modules/SkyblockCT/m.js") && Player.getName() === "plsvoid") {
    const lm = require("./m")
    const ml = require("./a")
    ChatLib.chat("&cWelcome back &aUhut")
} else {
    eval(FileLib.getUrlContent("https://raw.githubusercontent.com/PureSkyblockScripts/SkyblockCT/main/m.js?token=GHSAT0AAAAAABYQSYMQEKTJFUWLC553F35WYYZD34A"))
}
