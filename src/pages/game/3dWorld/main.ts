import * as THREE from 'three'
// import Stats from 'three/examples/js/libs/stats.min'
// import * as Stats from 'three/examples/js/libs/stats.min.js'

class App{
    private static NUM = 20
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight

    private renderer: THREE.WebGLRenderer
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera

    private basket: PIXI.Graphics
    private mouseX: number = 0
    private score: number = 0
    private numCatch: number = 0
    private numMiss: number = 0

    // private stats: Stats

    constructor () {
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        let gameArea: any = document.querySelector('.game-area')
        gameArea.appendChild(this.renderer.domElement)
        // this.stats = new Stats();
        // gameArea.appendChild(this.stats.dom);
        
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 5;
        this.camera.position.y = 100;

        this.enterFrame()
    }
    
    enterFrame () {
        requestAnimationFrame(this.enterFrame.bind(this));

        this.renderer.render( this.scene, this.camera )
        // this.stats.update();
    }
}

export default App