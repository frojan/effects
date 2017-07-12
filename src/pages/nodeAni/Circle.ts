class Circle extends PIXI.Graphics{
    public vx:number = Math.random()*6-3
    public vy:number = Math.random()*6-3
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight
    constructor(x: number, y: number, radius: number){
        super()
        this.beginFill(0xffffff * Math.random());
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.x = x;
        this.y = y;
    }
    update(){
        this.x += this.vx
        this.y += this.vy

        if (this.x > Circle.SCREEN_WIDTH) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = Circle.SCREEN_WIDTH;
        }
        if (this.y > Circle.SCREEN_HEIGHT) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = Circle.SCREEN_HEIGHT;
        }
        // if (this.x > Circle.SCREEN_WIDTH) {
        //     this.vx = -Math.abs(this.vx)
        // } else if (this.x < 0) {
        //     this.vx = Math.abs(this.vx)
        // }
        // if (this.y > Circle.SCREEN_HEIGHT) {
        //     this.vy = -Math.abs(this.vy)
        // } else if (this.y < 0) {
        //     this.vy = Math.abs(this.vy)
        // }
    }
}

export default Circle