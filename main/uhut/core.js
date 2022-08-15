import skyblockmenu from "./menu/skyblockmenu"














register("playerInteract", (act, pos, event) => {
    if (Player.getHeldItemIndex() === 8) {
        const m = new skyblockmenu()
    }
})
register("guiMouseClick", (x, y, mb, gui, event) => {
    let clicked = gui.slotUnderMouse.getSlotIndex()
    ChatLib.chat("you clicked " + clicked)
    if (Player.getOpenedInventory().getName() === "Skyblock Menu") cancel(event)
})
register("packetSent", (packet, event) => {
    cancel(event)
})