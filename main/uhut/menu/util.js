
const JsonToNBT = Java.type("net.minecraft.nbt.JsonToNBT")
const ItemStack = Java.type("net.minecraft.item.ItemStack")
const Items = Java.type("net.minecraft.init.Items");
const Mc = Client.getMinecraft();
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const setSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot");

export default class setItem {
    constructor(slot, item) {
        Player.getContainer().container.func_75141_a(slot, new Item(item).getItemStack())
    }
}