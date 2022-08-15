import setItem from "./util";

const JsonToNBT = Java.type("net.minecraft.nbt.JsonToNBT")
const ItemStack = Java.type("net.minecraft.item.ItemStack")
const Blocks = Java.type("net.minecraft.init.Items");
const Mc = Client.getMinecraft();
const InventoryBasic = Java.type("net.minecraft.inventory.InventoryBasic");
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
const setslot = (slot, mcItemStack) => {
    Player.getContainer().container.func_75141_a(slot, mcItemStack)
}
export default class SkyblockMenu {
    constructor() {
        new Thread(() => {
            GuiHandler.openGui(new GuiChest(Player.getPlayer().field_71071_by, new InventoryBasic("Skyblock Menu", true, 54)));
            Thread.sleep(50)
            for (i=0;i<54;i++) {setslot(i, new Item("stained_glass_pane").setDamage(15).getItemStack())}
            setslot(13, new Item("diamond_block").setName("&aYour skyblock profile").setLore("&7This is your profile", "&7you are a no life").getItemStack())
        }).start()
    }
}