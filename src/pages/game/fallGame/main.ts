import Food from './Food'
class App{
    private static NUM = 20
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight

    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer
    private stage: PIXI.Container

    private foods: Food[] = []
    private basket: PIXI.Graphics
    private mouseX: number = 0
    private score: number = 0
    private numCatch: number = 0
    private numMiss: number = 0

    private scorePanel: PIXI.Text

    constructor () {
        this.renderer = PIXI.autoDetectRenderer(App.SCREEN_WIDTH, App.SCREEN_HEIGHT, 
        {
            antialias: true, 
            transparent: false, 
            resolution: 1
        })
        let gameArea: any = document.querySelector('.game-area')
        gameArea.appendChild(this.renderer.view)
        this.stage = new PIXI.Container()

        this.creatFoods()
        this.initBasket()
        this.initPanel()
        this.enterFrame()
    }
    creatFoods () {
        let food
        for(let i = 0; i<App.NUM; i++){
            food = new Food()
            this.foods.push(food)
            this.stage.addChild(food)
        }
    }
    initBasket () {
        this.basket = new PIXI.Graphics()
        this.basket.beginFill(0xffffff)
        this.basket.drawRect(0, 0, 50, 20)
        this.basket.endFill()
        this.basket.x = 0
        this.basket.y = App.SCREEN_HEIGHT - this.basket.height/2
        this.basket.pivot.x = this.basket.width / 2
        this.basket.pivot.y = this.basket.height / 2

        this.stage.addChild(this.basket)

        this.basket.interactive = true
        this.basket.on('pointermove', this.onMove.bind(this))
    }
    onMove (event: any) {
        this.mouseX = event.data.global.x
    }
    initPanel () {
        this.scorePanel = new PIXI.Text(`分数：${this.score}`, {
            fontFamily: "Arial",
            fontSize: 20,
            fill: "white"
        })
        this.scorePanel.x = 0
        this.scorePanel.y = 0
        this.stage.addChild(this.scorePanel)
    }
    scoreUpdate () {
        this.scorePanel.text = `score: ${this.score}\ncatch: ${this.numCatch}\nmiss: ${this.numMiss}`
    }
    enterFrame () {
        requestAnimationFrame(this.enterFrame.bind(this));

        this.basket.x = Math.max(Math.min(this.mouseX, App.SCREEN_WIDTH-this.basket.width/2), this.basket.width/2)

        for(let i = 0; i < App.NUM; i++ ){
            this.foods[i].update()
            if(this.hitTestRectangle(this.foods[i], this.basket)){
                this.numCatch++
                this.score += this.foods[i].score
                this.foods[i].init()
            }else if(this.foods[i].y >= App.SCREEN_HEIGHT+this.foods[i].height/2){
                this.numMiss++
                this.foods[i].init()
            }
        }
        this.scoreUpdate()
        this.renderer.render(this.stage)
    }

    hitTestRectangle (c1: PIXI.Container, c2: PIXI.Container) {
        var hit, combinedHalfWidths, combinedHalfHeights, vx, vy
        hit = false
        vx = c1.x - c2.x
        vy = c1.y - c2.y
        combinedHalfWidths = c1.width*.5 + c2.width*.5;
        combinedHalfHeights = c1.height*.5 + c2.height*.5;

        if (Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
            hit = true;
        } else {
            hit = false;
        }
        return hit;
    }
}

export default App