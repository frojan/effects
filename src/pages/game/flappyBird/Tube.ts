class Tube extends PIXI.Container{
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight

    public vx: number = 1
    private tubeUp: PIXI.Graphics
    private tubeDown: PIXI.Graphics
    constructor(x:number){
        super()
        this.tubeUp = new PIXI.Graphics()
        this.tubeDown = new PIXI.Graphics()
        this.addChild(this.tubeUp)
        this.addChild(this.tubeDown)
        this.init(x)
    }
    init (x: number) {
        let space = 100
        let minHeight = 100
        let height = Math.floor(Math.random() * (Tube.SCREEN_HEIGHT-space-minHeight*2) + minHeight)
        let color = 0xffffff * Math.random()

        this.tubeUp.clear()
        this.tubeUp.beginFill(color)
        this.tubeUp.drawRect(0, 0, 40, height)
        this.tubeUp.endFill()
        this.tubeUp.x = 0 
        this.tubeUp.y = 0

        this.tubeDown.clear()
        this.tubeDown.beginFill(color)
        this.tubeDown.drawRect(0, 0, 40, Tube.SCREEN_HEIGHT-space-height)
        this.tubeDown.endFill()
        this.tubeDown.x = 0
        this.tubeDown.y = Tube.SCREEN_HEIGHT - this.tubeDown.height

        this.x = x
    }
    update(){
        this.x -= this.vx
    }
}
export default Tube