import Tube from './Tube'
class App{
    private static NUM = 5
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight

    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer
    private stage: PIXI.Container

    private bg: PIXI.Graphics
    private tubes: Tube[] = []
    private bird: PIXI.Graphics
    private targetIndex: number = 0

    private score: number = 0
    private numDie: number = 0

    private scorePanel: PIXI.Text

    private gravity: number = 0.2
    private flySpeedY: number = 0

    private gameover: boolean = false

    constructor () {
        this.renderer = PIXI.autoDetectRenderer(App.SCREEN_WIDTH, App.SCREEN_HEIGHT, 
        {
            antialias: true, 
            transparent: false, 
            resolution: 1,
            forceCanvas: true
        })
        this.renderer.view.style.width = App.SCREEN_WIDTH + 'px'
        this.renderer.view.style.height = App.SCREEN_HEIGHT + 'px'
        let gameArea: any = document.querySelector('.game-area')
        gameArea.appendChild(this.renderer.view)
        this.stage = new PIXI.Container()
        // this.stage.scale.set(10)
        // this.renderer.resize(App.SCREEN_WIDTH*10, App.SCREEN_HEIGHT*10)
        this.initBg()
        this.createTube()
        this.initBird()
        this.initPanel()
        this.enterFrame()
    }
    initBg(){
        this.bg = new PIXI.Graphics()
        this.bg.beginFill(0x000000)
        this.bg.drawRect(0, 0, App.SCREEN_WIDTH, App.SCREEN_HEIGHT)
        this.bg.endFill()
        this.bg.x = 0
        this.bg.y = 0
        this.stage.addChild(this.bg)
    }
    createTube () {
        let tube
        let lastPosx = App.SCREEN_WIDTH
        for(let i=0; i<App.NUM; i++){
            tube = new Tube(lastPosx)
            this.stage.addChild(tube)
            this.tubes.push(tube)

            lastPosx += 150
        }
    }
    initBird () {
        this.bird = new PIXI.Graphics()
        this.bird.beginFill(0xffffff)
        this.bird.drawRect(0, 0, 20, 20)
        this.bird.endFill()
        this.bird.x = App.SCREEN_WIDTH * 0.5
        this.bird.y = App.SCREEN_HEIGHT * 0.5
        this.bird.pivot.x = this.bird.width / 2
        this.bird.pivot.y = this.bird.height / 2

        this.stage.addChild(this.bird)
        
        this.stage.interactive = true
        this.stage.on('pointerdown', this.onDown.bind(this))
    }
    onDown (event: any) {
        this.flySpeedY = -4
        this.gameover = false
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
        this.scorePanel.text = `score: ${this.score}\ndie: ${this.numDie}`
    }
    enterFrame () {
        requestAnimationFrame(this.enterFrame.bind(this));

        this.flySpeedY += this.gravity
        this.bird.y += this.flySpeedY

        if(!this.gameover){
            for(let i = 0; i < this.tubes.length; i++ ){
                if(this.hitTube(this.tubes[i], this.bird)){
                    this.numDie++
                    this.gameover = true
                    return
                }
                this.tubes[i].update()
                if(this.tubes[i].x < -this.tubes[i].width){
                    this.tubes[i].init(this.tubes[i === 0 ? this.tubes.length-1 : i - 1].x + 150)
                }
            }
            if (this.bird.y >= App.SCREEN_HEIGHT) {
                this.numDie++
                this.gameover = true
            }

            if(this.bird.x - this.bird.width*.5 > this.tubes[this.targetIndex].x+this.tubes[this.targetIndex].width){   
                this.targetIndex = (this.targetIndex+1) % this.tubes.length
                this.score++
            }
        }

        if (this.bird.y >= App.SCREEN_HEIGHT) {
            this.bird.y = App.SCREEN_HEIGHT
        } 
        
        this.scoreUpdate()
        this.renderer.render(this.stage)
    }

    hitTube(tube: PIXI.Container, bird: PIXI.Container){
        let upTube = <PIXI.Graphics>tube.getChildAt(0)
        let downTube = <PIXI.Graphics>tube.getChildAt(1)
        let hit = false
        let up = {
            x: tube.x + tube.width * .5,
            y: upTube.y + upTube.height * .5,
            width: tube.width,
            height: upTube.height
        }
        let down = {
            x: tube.x + tube.width * .5,
            y: downTube.y + downTube.height * .5,
            width: tube.width,
            height: downTube.height
        }
        if (this.hitTestRectangle(up, bird)) {
            hit = true
            // console.log('hit up')
        }else if(this.hitTestRectangle(down, bird)){
            hit = true
            // console.log('hit down')
        }
        return hit
    }

    hitTestRectangle (c1: any, c2: PIXI.Container) {
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