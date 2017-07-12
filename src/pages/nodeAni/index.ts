import Circle from 'Circle'
import PIXI from 'pixi'
class App{
    private static NUM = 35
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight
    private static minDist = 100
    private static springAmount = 0.001

    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer
    private stage: PIXI.Container
    private arrs: Circle[] = []
    private lineGraph: PIXI.Graphics
    constructor () {
        // this.renderer = PIXI.autoDetectRenderer(App.SCREEN_WIDTH, App.SCREEN_HEIGHT, 
        // {
        //     antialias: true, 
        //     transparent: false, 
        //     resolution: 1
        // });
        this.renderer = new PIXI.CanvasRenderer(App.SCREEN_WIDTH, App.SCREEN_HEIGHT, 
        {
            antialias: true, 
            transparent: false, 
            resolution: 1
        })
        document.body.appendChild(this.renderer.view)
        this.stage = new PIXI.Container();

        this.lineGraph = new PIXI.Graphics()
        this.stage.addChild(this.lineGraph)
        this.creatCircles()

        this.enterFrame()
    }
    creatCircles(){
        let circle
        let filter = new PIXI.filters.BlurFilter()
        filter.blur = 3
        for(let i = 0; i < App.NUM; i++){
            circle = new Circle(Math.random() * this.renderer.width, Math.random() * this.renderer.height, 5)
            circle.filters = [filter]
            this.arrs.push(circle)
            this.stage.addChild(circle)
        }
    }
    enterFrame () {
        requestAnimationFrame(this.enterFrame.bind(this));
        let i
        let j
        for(i = 0; i < App.NUM; i++){
            // if(this.arrs[i].vx>9) this.arrs[i].vx = 9
            // if(this.arrs[i].vx<-9) this.arrs[i].vx = -9
            // if(this.arrs[i].vy>9) this.arrs[i].vy = 9
            // if(this.arrs[i].vy<-9) this.arrs[i].vy = -9
            this.arrs[i].update()
        }
        this.lineGraph.clear()
        for(i = 0; i < App.NUM-1; i++){
            for(let j = i + 1; j < App.NUM; j++){
                this.connectCircle(this.arrs[i], this.arrs[j])
            }
        }
        this.renderer.render(this.stage);
    }
    connectCircle(c1:Circle, c2:Circle){
        let dx = c1.x - c2.x;
        let dy = c1.y - c2.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        //If the distance between 2 nodes are smaller than minimum, connect them
        if (dist < App.minDist) {
            this.lineGraph.lineStyle(1, 0xFFFFFF, dist/App.minDist);
            this.lineGraph.moveTo(c1.x, c1.y);
            this.lineGraph.lineTo(c2.x, c2.y);
            var ax = dx * App.springAmount;
            var ay = dy * App.springAmount;
            // 控制相吸
            c2.vx += ax;
            c2.vy += ay;
            c1.vx -= ax;
            c1.vy -= ay;
            // 控制相斥
            // c2.vx -= ax;
            // c2.vy -= ay;
            // c1.vx += ax;
            // c1.vy += ay;
        }
    }
}

export default App