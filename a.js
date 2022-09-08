const cl = {
    DARK_BACK: Renderer.color(20, 20, 20),
    BUTTON_REND: Renderer.color(30, 30, 30, 210),
    BLACK: Renderer.color(0, 0, 0),
    TOPBAR: Renderer.color(35, 35, 35)
}
let icons = {}
new Thread(() => {
    icons.CLOSE = new Image("close", "https://media.discordapp.net/attachments/920744366014861312/1017219338454958080/pngegg.png?width=656&height=656")
}).start()
let g = new Gui();
let showint = 0
let selected = "Home"
let ChangeLog = ["&7[&a+&7] &aBasic GUI", "&7[&a+&7] &aAuto Sword Swap", "&7[&a+&7] &aAlpha Slave"]
g.registerClicked((x, y, but) => {
    if (x >= 840 && x <= 860 && y >= 30 && y <= 50) g.close()
    ChatLib.chat(x + " : " + y)
})
g.registerDraw(() => {
    switch (showint) {
        case 0:
            mainMenu()
            break;
    }
})

function mainMenu() {
    Renderer.drawRect(cl.DARK_BACK, 100, 50, Renderer.screen.getWidth()-200, Renderer.screen.getHeight()-100)
    drawStr("&cWelcome Back &a" + Player.getName(), Renderer.screen.getWidth()/2+75, 75)
    renderButtons(100, Renderer.screen.getWidth()-200)
    topBar(100, 50)
    drawChangelog()
    Renderer.translate(1, 1);
    Renderer.scale(50);
    Renderer.colorize(1, 1, 1, 1);
    Renderer.drawPlayer(Player, 11, 4, false, false, true, true, true)
}
function topBar(x, y) {
    Renderer.drawRect(cl.TOPBAR, x, y-20, Renderer.screen.getWidth()-(x*2), 20)
    Renderer.drawRect(Renderer.RED, Renderer.screen.getWidth()-x-20, y-20, 20, 20)
    icons.CLOSE.draw(Renderer.screen.getWidth()-x-18, y-18, 16, 16)
    Renderer.drawString("&6CQ &cStormAlpha &aEdition &7(0.0.2)", x+5, y-12)
}
function drawChangelog() {
    let x = 280
    let y = 80
    let longest = 0;
    ChangeLog.forEach((item) => {
        Renderer.drawString(item, x, y)
        if (Renderer.getStringWidth(item) > longest) longest = Renderer.getStringWidth(item)
        y+=12
    })
    let temp = y
    y = 80
    Renderer.drawLine(cl.TOPBAR, x-5, y-5, x+longest+5, y-5, 2)
    Renderer.drawLine(cl.TOPBAR, x-5, y-5, x-5, temp+5, 2)
    Renderer.drawLine(cl.TOPBAR, x-5, temp+5, x+longest+5, temp+5, 2)
    Renderer.drawLine(cl.TOPBAR, x+longest+5, temp+5, x+longest+5, y-5, 2)
    let cent = (longest+10)/2
    drawStr("&fChange Log", x+cent, y-15)
}
function renderButtons(topl, topr) {
    let start = topl
    let end = topr
    let y = 65
    let buttons = ["Home", "GUI", "Friends", "Settings", "Misc"]
    Renderer.drawLine(cl.BLACK, topl+150, 50, topl+150, Renderer.screen.getHeight()-50, 5)
    let cent = topl+75
    buttons.forEach((item, i) => {
        let col = "&a"
        if (item === selected) col = "&c"
        drawStr(col + item, cent, y)
        Renderer.drawLine(cl.BUTTON_REND, topl+6, y-9, topl+144, y-9, 2)
        Renderer.drawLine(cl.BUTTON_REND, topl+6, y-9, topl+6, y+17, 2)
        Renderer.drawLine(cl.BUTTON_REND, topl+6, y+17, topl+144, y+17, 2)
        Renderer.drawLine(cl.BUTTON_REND, topl+144, y+17, topl+144, y-9, 2)
        y+=30
    })
}
function drawStr(str, x, y) {
    Renderer.drawString(str, x-(Renderer.getStringWidth(str)/2), y)
}

let anim = new Gui()
let frame = 0
let xy = 0


register("command", () => {
    g.open()
}).setName("cqgui")