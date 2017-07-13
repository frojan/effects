class Food extends PIXI.Graphics{
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight

    public vy: number = Math.random() * 3 + 1
    public score: number = 0
    constructor(){
        super()   
        this.init()
    }
    init () {
        this.beginFill(0xffffff * Math.random())
        this.drawCircle(0, 0, 10)
        this.endFill()
        this.x = Food.SCREEN_WIDTH * Math.random()
        this.y = -Food.SCREEN_HEIGHT * Math.random()
        this.score = Math.round(Math.random() * 10)
    }
    update(){
        this.y += this.vy
    }
}
export default Food