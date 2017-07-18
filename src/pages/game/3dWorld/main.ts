import * as THREE from 'three'
import Stats from 'three/examples/js/libs/stats.min'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/controls/DeviceOrientationControls'
import dat from 'dat-gui'
console.log(dat)

class App{
    private static NUM = 20
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight

    private renderer: THREE.WebGLRenderer
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private controls: THREE.OrbitControls | THREE.DeviceOrientationControls

    private stats: Stats

    private ambLight: THREE.AmbientLight
    private dirLight: THREE.DirectionalLight
    private box: THREE.Mesh
    private gui: dat.GUI

    constructor () {
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.stats = new Stats();
        let gameArea: Element | null = document.querySelector('.game-area')
        if(gameArea) {
            gameArea.appendChild(this.renderer.domElement)
            gameArea.appendChild(this.stats.dom);
        }
        
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 10;
        this.controls = new THREE.OrbitControls( this.camera, <HTMLElement>gameArea );
        // this.controls = new THREE.DeviceOrientationControls( this.camera );

        this.initGUI()
        this.initLight()
        this.initObject()
        this.enterFrame()
        
    }

    initGUI () {
        let text = new FizzyText();
        this.gui = new dat.GUI()
        let folder1 = this.gui.addFolder( '大小' );
        folder1.add(text, 'width', 1, 10, .1).onChange(()=>{
            this.box.scale.x = text.width
        });
        folder1.add(text, 'heigth', 1, 10, .1).onChange(()=>{
            this.box.scale.y = text.heigth
        });
        folder1.add(text, 'depth', 1, 10, .1).onChange(()=>{
            this.box.scale.z = text.depth
        });
        let folder2 = this.gui.addFolder( '颜色' );
        folder2.addColor(text, 'color').onChange(()=>{
            (this.box.material as THREE.MeshPhongMaterial).color = new THREE.Color(text.color)
        });
    }

    initLight() {

        this.ambLight = new THREE.AmbientLight(0xffffff);
        this.scene.add( this.ambLight );

        // this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // this.dirLight.position.set(0.5, 1, 0.2);
        // this.scene.add(this.dirLight);
    }
    
    initObject () {
        let boxGeo = new THREE.BoxGeometry(1, 1, 1)
        let boxMat = new THREE.MeshPhongMaterial( { color: 0x00ffff } )
        
        this.box = new THREE.Mesh( boxGeo, boxMat )
        this.box.position.set(0,0,0)
        this.scene.add(this.box)
    }

    enterFrame () {
        requestAnimationFrame(this.enterFrame.bind(this));

        this.controls.update();
        this.renderer.render( this.scene, this.camera )
        this.stats.update();
    }
}

export default App

class FizzyText {
    public width:number = 1;
    public heigth:number = 1;
    public depth:number = 1;
    public color = 0x00ffff;
}