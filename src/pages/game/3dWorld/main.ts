import * as THREE from 'three'
import Stats from 'three/examples/js/libs/stats.min'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/controls/DeviceOrientationControls'
import dat from 'dat-gui'

class App{
    private static NUM = 20
    private static SCREEN_WIDTH = document.documentElement.clientWidth
    private static SCREEN_HEIGHT = document.documentElement.clientHeight

    private gameArea: HTMLElement
    private renderer: THREE.WebGLRenderer
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private controls: THREE.OrbitControls | THREE.DeviceOrientationControls

    private stats: Stats

    private ambLight: THREE.AmbientLight
    private dirLight: THREE.DirectionalLight
    private box: THREE.Mesh

    private config: FizzyText
    private gui: dat.GUI

    constructor () {
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.stats = new Stats();
        this.gameArea = <HTMLElement>document.querySelector('.game-area')
        if(this.gameArea) {
            this.gameArea.appendChild(this.renderer.domElement)
            this.gameArea.appendChild(this.stats.dom);
        }
        
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 10;
        this.controls = new THREE.OrbitControls( this.camera, this.gameArea );
        // this.controls = new THREE.DeviceOrientationControls( this.camera );

        this.initLight()
        this.initObject()
        this.enterFrame()
        this.initGUI()
        
    }

    initGUI () {
        let myjson = {
            "preset": "Default",
            "remembered": {
                "Default": {
                    "0": {
                        "width": 6.1000000000000005,
                        "heigth": 6.9958642081681885,
                        "depth": 7.095123212131656,
                        "color": 65535
                    }
                },
                "red": {
                    "0": {
                        "width": 10,
                        "heigth": 10,
                        "depth": 10,
                        "color": 14876779
                    }
                }
            },
            "closed": false,
            "folders": {
                "大小": {
                    "preset": "Default",
                    "closed": false,
                    "folders": {}
                },
                "颜色": {
                    "preset": "Default",
                    "closed": false,
                    "folders": {}
                }
            }
        }
        this.config = new FizzyText();
        this.gui = new dat.GUI({ autoPlace: false, load: myjson });
        (this.gameArea.parentElement as HTMLElement).appendChild(this.gui.domElement)
        this.gui.domElement.style.cssText = 'position: absolute; right: 0; top: 0; margin-right: 10px';
        let folder1 = this.gui.addFolder( '大小' );
        folder1.add(this.config, 'width', 1, 10).step(.1).onChange(()=>{
            this.box.scale.x = this.config.width
        });
        folder1.add(this.config, 'heigth', 1, 10).onChange(()=>{
            this.box.scale.y = this.config.heigth
        });
        folder1.add(this.config, 'depth', 1, 10).onChange(()=>{
            this.box.scale.z = this.config.depth
        });
        let folder2 = this.gui.addFolder( '颜色' );
        folder2.addColor(this.config, 'color').onChange(()=>{
            (this.box.material as THREE.MeshPhongMaterial).color = new THREE.Color(this.config.color)
        });

        this.gui.remember(this.config)
        this.gui.revert(this.gui)
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