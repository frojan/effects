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

        this.gameArea.addEventListener('drop', this.loadImage.bind(this))
        
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.x = 100
        this.camera.position.y = 100
        this.camera.position.z = 100
        this.controls = new THREE.OrbitControls( this.camera, this.gameArea );
        // this.controls = new THREE.DeviceOrientationControls( this.camera );

        this.disableDefaultDrag()
        this.initLight()
        this.initObject()
        this.enterFrame()
        
    }
    loadImage(e){
        e.preventDefault();
        var fileList = e.dataTransfer.files;
        let cubeTexture
        if (fileList.length === 6) {
            let arr: string[] = []
            for(let i=0;i<fileList.length;i++){
                switch(fileList[i].name.split('.')[0]){
                    case 'left':
                        arr[0] = window.URL.createObjectURL(fileList[i])
                    break;
                    case 'right':
                        arr[1] = window.URL.createObjectURL(fileList[i])
                    break;
                    case 'top':
                        arr[2] = window.URL.createObjectURL(fileList[i])
                    break;
                    case 'bottom':
                        arr[3] = window.URL.createObjectURL(fileList[i])
                    break;
                    case 'front':
                        arr[4] = window.URL.createObjectURL(fileList[i])
                    break;
                    case 'back':
                        arr[5] = window.URL.createObjectURL(fileList[i])
                    break;
                }
            }
            cubeTexture = new THREE.CubeTextureLoader()
					.load( arr );
        } else {
            let url = window.URL.createObjectURL(fileList[0])
            cubeTexture = new THREE.CubeTextureLoader()
					.load( [ url,url,url,url,url,url ] );
        }
        this.scene.background = cubeTexture
    }

    disableDefaultDrag(){
        document.addEventListener('dragleave', e => e.preventDefault()) //拖离
        document.addEventListener('drop', e => e.preventDefault()) //拖后放
        document.addEventListener('dragenter', e => e.preventDefault()) //拖进
        document.addEventListener('dragover', e => e.preventDefault()) //拖来拖去
    }

    initLight() {
        this.ambLight = new THREE.AmbientLight(0x000000);
        this.scene.add( this.ambLight );

        this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
        this.dirLight.position.set(0.5, 1, 0.2);
        this.scene.add(this.dirLight);
    }
    
    initObject () {
        
    }

    enterFrame () {
        requestAnimationFrame(this.enterFrame.bind(this));

        this.controls.update();
        this.renderer.render( this.scene, this.camera )
        this.stats.update();
    }
}

export default App