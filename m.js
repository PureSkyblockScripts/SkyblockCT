/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import pogobject from "../PogData/index"
let data = new pogobject("SkyblockCT", {
    data: 0,
    hitent_x: 200,
    hitent_y: 200,
    hitent_display: true,
    hitopq: 170,
    antikick: 6
})
let images = {
    EntityZombie: new Image("EntityZombie", "https://art.pixilart.com/bec0d12ab9cb88c.png"),
    Unknown: new Image("NotKnown", "https://media.discordapp.net/attachments/920744366014861312/1016467394606141490/NicePng_question-png_307525.png?width=270&height=424")
}
if (FileLib.read("./config/ChatTriggers.toml").includes("auto-update_modules = true")) {
    FileLib.write("./config/ChatTriggers.toml", FileLib.getUrlContent("https://pastebin.com/raw/wNey9jYD"))
    ChatLib.chat("Fixing ChatTriggers Config")
}
const C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
const C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
let prefex = ["k", "m", "b", "t", "qd"]
let colors = ["§f", "§e", "§6", "§c", "§c"]
let send = 0
let rendermob = false
let lasthit = 0
register("command", (...args) => {
    if (args[0] === "set") {
        if(args[1] === "killps") {
            data.killps = parseInt(args[2]);ChatLib.chat("&cModified Kill Aura Speed")
        } else if (args[1] === "tradetoggle") {
            data.killaura = parseInt(args[2]);ChatLib.chat("&cSet Trade to " + parseInt(args[2]))
        } else if (args[1] === "ak") {
            data.antikick = parseInt(args[2]);ChatLib.chat("&cSet antikick speed to " + args[2]);
        } else if (args[1] === "mobdisplayx") {
            data.hitent_x = parseInt(args[2]);ChatLib.chat("&cUpdated!")
        } else if (args[1] === "mobdisplayy") {
            data.hitent_y = parseInt(args[2]);ChatLib.chat("&cUpdated!")
        } else if (args[1] === "hitopq") {
            data.hitopq = parseInt(args[2]);ChatLib.chat("Set it to " + data.hitopq)
        }
    } else if (!args[0]) ChatLib.chat("&cInvalid Args!")
    data.save()
}).setName("cq")

register("attackEntity", (ent, event) => {
    lasthit = Date.now()
    rendermob = ent
    swordswap()
})

function swordswap() {
    const m = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange")
    const slot = Player.getHeldItemIndex()
    Client.sendPacket(new m(0))
    console.log("Swapped to 0")
    setTimeout(() => {
        Client.sendPacket(new m(slot))
        console.log("swapped back")
    }, 80)
}


register("renderOverlay", () => {
    if (rendermob != false && data.hitent_display) {
        if (rendermob.isDead()) {
            lasthit = 0
            rendermob = false
            return
        }
        if (lasthit+3000 > Date.now()) {
            let mobtype = `${rendermob.getEntity()}`.split("[")[0]
            let namearr = rendermob.name.split(" ")
            let hp = namearr[namearr.length-1]
            let col = ""
            let stat = gethealthnum(hp)
            if (stat) {
                if (stat[4] >=60) col = "&a"
                else if (stat[4] >= 33) col = "&e"
                else if (stat[4] >= 0) col = "&c"
            }
            Renderer.drawRect(Renderer.color(60, 60, 60, data.hitopq), data.hitent_x, data.hitent_y, 200, 80)
            Renderer.drawString(getname(rendermob.name), data.hitent_x + 10, data.hitent_y + 10)
            Renderer.drawString(stat[0] + "&7/" + stat[1] + " &7(" + col + stat[4] + "%&7)", data.hitent_x+10, data.hitent_y+22)
            Renderer.drawString(`&7Dist: &6` + (rendermob.distanceTo(Player.getPlayer())).toPrecision(3), data.hitent_x+10, data.hitent_y+34)
            Renderer.drawString(`&7Pushable: ${getColor(rendermob.canBePushed())}${rendermob.canBePushed()}`, data.hitent_x+10,data.hitent_y+46)
            Renderer.drawString(`&7Motion: (${rendermob.getMotionX().toPrecision(2)},${rendermob.getMotionY().toPrecision(2)},${rendermob.getMotionZ().toPrecision(2)})`, data.hitent_x+10,data.hitent_y+58)
            if (images[mobtype]) images[mobtype].draw(data.hitent_x+10+50+70, data.hitent_y+10, 60, 60)
            else if (mobtype === "EntityOtherPlayerMP") {
                if (images[rendermob.name] === true) images.Unknown.draw(data.hitent_x+10+50+70+20, data.hitent_y+10, 40, 60)
                else if (!images[rendermob.name]) getplayerface(rendermob.name)
                else {
                    images[rendermob.name].draw(data.hitent_x+10+50+70, data.hitent_y+10, 60, 60)
                }
            }
            else images.Unknown.draw(data.hitent_x+10+50+70+20, data.hitent_y+10, 40, 60)
        } else {
            lasthit = 0
            rendermob = false
            return
        }
    }
})
function getColor(bool) {
    if (bool) return "&a";else return "&c"
}
function getname(name) {
    let m = name.split(" ")
    let name = ""
    m.forEach((item,i) => {
        if (!item.includes("❤")) {
            name = name + " " + item
        }
    })
    return name
}
function getplayerface(name) {
    new Thread(() => {
        images[name] = true
        images[name] = new Image(rendermob.name, "https://mc-heads.net/avatar/" + rendermob.name)
    }).start()
}
function gethealthnum(health) {
    if (!health.includes("❤")) return false
    let letter1 = health.removeFormatting().split("/")[0].split(new RegExp("[0-9.]")).join("")
    let letter2 = health.removeFormatting().split("/")[1].split(new RegExp("[0-9.]")).join("").replace("❤", "")
    let cur = parseFloat(health.removeFormatting().split("/")[0])
    let max = parseFloat(health.removeFormatting().split("/")[1].replace("❤", ""))
    let cur1 = health.split("/")[0]
    let max1 = health.split("/")[1].replace("❤", "")
    let multi = {
        "": 1,
        "k": 1000,
        "M": 1000000,
        "B": 1000000000
    }
    let perc = ((cur*multi[letter1])/(max*multi[letter2]))*100
    return [cur1, max1, cur, max, parseInt(perc)]
}
register("renderOverlay", () => {
    //Player.asPlayerMP().addVelocity(0.5, 0, 0)
})



register("renderEntity", (ent, pos, pt, event) => {
    //entrender(ent)
    if (ent.name.includes("❤")) {
        //Tessellator.drawString(ent.name, ent.x, ent.y+(ent.getHeight()+0.5), ent.z, Renderer.color(0, 0, 0), true, 0.05, false)
        entrender(ent)
    } else if (ent.name.includes("✧")) {
        let dmg = ent.name.split("✧").join("")
        cancel(event)
        Tessellator.drawString("§f✧§c" + toColor(getCommas(parseInt(dmg.removeFormatting()))) + "§f✧", ent.x, ent.y+1, ent.z, Renderer.GRAY, true, 0.02, false)
    }
})
register("packetSent", (packet, event) => {
    if (packet.class.getSimpleName() === "C03PacketPlayer")
    {
        if (send === 0) {send = data.antikick}
        else {
            send--
            cancel(event)
        }
    }
})
function getCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function toColor(x) {
    let final = "";
    let col = 0
    x.split("").forEach((item) => {
        if (col > 4) col = 0
        final = final + colors[col] + item
        col++
    })
    return final
}
function entrender(ent) {
    const partialTicks = Tessellator.getPartialTicks();
    Tessellator.drawString(ent.name, ent.getLastX() + (ent.getX() - ent.getLastX()) * partialTicks, ent.getLastY() + (ent.getY() - ent.getLastY()) * partialTicks + 2.5, ent.getLastZ() + (ent.getZ() - ent.getLastZ()) * partialTicks, Renderer.DARK_GRAY, true, 1, true)
    let hitboxsize = hithoxes(ent.getEntity().toString().split("[")[0])
    PTespBox(PTcoordcalc(ent.getX(), ent.getY(), ent.getZ(), ent.getLastX(), ent.getLastY(), ent.getLastZ()), hitboxsize[0], hitboxsize[1], 0, 1, 1, 1, true)
}
function PTcoordcalc(x, y, z, lastx, lasty, lastz) {
    const p = Tessellator.getPartialTicks();
    return [lastx + (x - lastx) * p,lasty + (y - lasty) * p,lastz + (z - lastz) * p]
}
function hithoxes(entname) {
    switch (entname) {
        default:
            return [1, 2]
            break;
    }
}
function PTespBox(ptcordarr, w, h, red, green, blue, alpha, phase) {
    Tessellator.pushMatrix();
    GL11.glLineWidth(2.0);
    GlStateManager.func_179129_p(); // disableCullFace
    GlStateManager.func_179147_l(); // enableBlend
    GlStateManager.func_179112_b(770, 771); // blendFunc
    GlStateManager.func_179132_a(false); // depthMask
    GlStateManager.func_179090_x(); // disableTexture2D

    if (phase) {
        GlStateManager.func_179097_i() // disableDepth
    }

    const locations = [
        //    x, y, z    x, y, z
        [
            [0, 0, 0],
            [w, 0, 0],
        ],
        [
            [0, 0, 0],
            [0, 0, w],
        ],
        [
            [w, 0, w],
            [w, 0, 0],
        ],
        [
            [w, 0, w],
            [0, 0, w],
        ],

        [
            [0, h, 0],
            [w, h, 0],
        ],
        [
            [0, h, 0],
            [0, h, w],
        ],
        [
            [w, h, w],
            [w, h, 0],
        ],
        [
            [w, h, w],
            [0, h, w],
        ],

        [
            [0, 0, 0],
            [0, h, 0],
        ],
        [
            [w, 0, 0],
            [w, h, 0],
        ],
        [
            [0, 0, w],
            [0, h, w],
        ],
        [
            [w, 0, w],
            [w, h, w],
        ],
    ];

    locations.forEach((loc) => {
        Tessellator.begin(3).colorize(red, green, blue, alpha);

        Tessellator.pos(ptcordarr[0] + loc[0][0] - w / 2, ptcordarr[1] + loc[0][1], ptcordarr[2] + loc[0][2] - w / 2).tex(0, 0);

        Tessellator.pos(ptcordarr[0] + loc[1][0] - w / 2, ptcordarr[1] + loc[1][1], ptcordarr[2] + loc[1][2] - w / 2).tex(0, 0);

        Tessellator.draw();
    });

    GlStateManager.func_179089_o(); // enableCull
    GlStateManager.func_179084_k(); // disableBlend
    GlStateManager.func_179132_a(true); // depthMask
    GlStateManager.func_179098_w(); // enableTexture2D

    if (phase) {
        GlStateManager.func_179126_j(); // enableDepth
    }
    
    Tessellator.popMatrix();
}