
register("renderHotbar", (event) => {
    //cancel(event)
    let x = Renderer.screen.getWidth()/2-121.5
    let y = 0+10
    for (i=0;i<9;i++) {
        if (Player?.getInventory()?.getItems()[i])Player.getInventory().getItems()[i].draw(x, y, 1.5)
        if (i === Player.getHeldItemIndex()) Renderer.drawLine(Renderer.LIGHT_PURPLE, x-2, y-3, x+25, y-3, 2)
        x+=27
    }
    Renderer.drawLine(Renderer.color(30, 30, 30, 210), Renderer.screen.getWidth()/2-127, y-5, Renderer.screen.getWidth()/2+127, y-5, 2)
    Renderer.drawLine(Renderer.color(30, 30, 30, 210), Renderer.screen.getWidth()/2-127, y-5, Renderer.screen.getWidth()/2-127, y+32, 2)
    Renderer.drawLine(Renderer.color(30, 30, 30, 210), Renderer.screen.getWidth()/2-127, y+31, Renderer.screen.getWidth()/2+127, y+31, 2)
    Renderer.drawLine(Renderer.color(30, 30, 30, 210), Renderer.screen.getWidth()/2+127, y-5, Renderer.screen.getWidth()/2+127, y+31, 2)
})
