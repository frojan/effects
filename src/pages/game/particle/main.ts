import * as THREE from 'three'
import Stats from 'three/examples/js/libs/stats.min'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/controls/DeviceOrientationControls'
import dat from 'dat-gui'
import Particle from './Particle'

class App{
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
    
    private particles: Particle[] = []
    private particleContainer: THREE.Group
    private defaultMaterial: THREE.CanvasTexture
    private particleMaterial: THREE.SpriteMaterial

    private particleConfig = {
        "textures": [
            "resource/chong.png"
        ],
        "number": 1000,
        "minPos": {
            "x": -100,
            "y": -100,
            "z": -100,
            "w": 1
        },
        "maxPos": {
            "x": 100,
            "y": 100,
            "z": 100,
            "w": 1
        },
        "minSpeed": {
            "x": -7.5,
            "y": -7.5,
            "z": -7.5,
            "w": 1
        },
        "maxSpeed": {
            "x": 7.5,
            "y": 7.5,
            "z": 7.5,
            "w": 1
        },
        "maxRotSpeed": 5,
        "isHaveLife": false,
        "colorStart": {
            "x": 1,
            "y": 1,
            "z": 1,
            "w": 1
        },
        "colorEnd": {
            "x": 1,
            "y": 1,
            "z": 1,
            "w": 1
        },
        "isNeedChangeDir": true,
        "minUpdateFrameSpeed": 10,
        "maxUpdateFrameSpeed": 20,
        "scale": 1,
        "frameCountPerRow": 8,
        "particleFrameCount": 40,
        "isNeedKeepDir": false    
    }

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
        this.initObj()
        this.initParticle()
        this.initGUI()
        
        this.enterFrame()
    }
    initObj () {
        let planeGeo = new THREE.PlaneGeometry(100,100,10,10)
        let planeMat = new THREE.MeshBasicMaterial({wireframe: true})
        let plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotateX(Math.PI*0.5)
        this.scene.add( plane );
    }
    initParticle () {
        this.defaultMaterial = new THREE.CanvasTexture( this.generateSprite() );
        this.particleMaterial = new THREE.SpriteMaterial({
            color: 0xff0000,
            rotation: Math.PI / 4
        })
        this.particleContainer = new THREE.Group()
        let particle
        for (let i=0; i<this.particleConfig['number']; i++) {
            particle = new Particle(this.particleMaterial || this.defaultMaterial)
            this.firstSetParticle(particle)
            this.particleContainer.add(particle)
            this.particles.push(particle)
        }

        this.scene.add(this.particleContainer)
    }
    firstSetParticle (particle: Particle) {
        let minPos = this.particleConfig.minPos
        let maxPos = this.particleConfig.maxPos
        let minSpeed = this.particleConfig.minSpeed
        let maxSpeed = this.particleConfig.maxSpeed
        particle.px = this.randomFloat(minPos.x, maxPos.x);
        particle.py = this.randomFloat(minPos.y, maxPos.y);
        particle.pz = this.randomFloat(minPos.z, maxPos.z);
        particle.speedX = this.randomFloat(minSpeed.x, maxSpeed.x);
        particle.speedY = this.randomFloat(minSpeed.y, maxSpeed.y);
        particle.speedZ = this.randomFloat(minSpeed.z, maxSpeed.z);
        particle.psize = this.particleConfig.scale;
        particle.speedRot = this.randomFloat(0, this.particleConfig.maxRotSpeed)
    }
    resetParticle (particle: Particle) {
        let minPos = this.particleConfig.minPos
        let maxPos = this.particleConfig.maxPos
        particle.px = this.randomFloat(minPos.x, maxPos.x);
        particle.py = this.randomFloat(minPos.y, maxPos.y);
        particle.pz = this.randomFloat(minPos.z, maxPos.z);
        let minSpeed = this.particleConfig.minSpeed
        let maxSpeed = this.particleConfig.maxSpeed
        particle.speedX = this.randomFloat(minSpeed.x, maxSpeed.x);
        particle.speedY = this.randomFloat(minSpeed.y, maxSpeed.y);
        particle.speedZ = this.randomFloat(minSpeed.z, maxSpeed.z);
    }
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    generateSprite() {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 16;
        canvas.height = 16;
        var context = <CanvasRenderingContext2D>canvas.getContext( '2d' );
        var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
        gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
        gradient.addColorStop( 0.5, 'rgba(255,255,255,0)' );
        gradient.addColorStop( 1, 'rgba(255,255,255,0)' );
        context.fillStyle = gradient;
        context.fillRect( 0, 0, canvas.width, canvas.height );
        return canvas;
    }

    initGUI () {
        // let myjson = {}
        // this.config = new FizzyText();
        // this.gui = new dat.GUI({ autoPlace: false, load: myjson });
        // (this.gameArea.parentElement as HTMLElement).appendChild(this.gui.domElement)
        // this.gui.domElement.style.cssText = 'position: absolute; right: 0; top: 0; margin-right: 10px';
        // let folder1 = this.gui.addFolder( '大小' );
        // folder1.add(this.config, 'width', 1, 10).step(.1).onChange(()=>{
        //     this.box.scale.x = this.config.width
        // });
        // folder1.add(this.config, 'heigth', 1, 10).onChange(()=>{
        //     this.box.scale.y = this.config.heigth
        // });
        // folder1.add(this.config, 'depth', 1, 10).onChange(()=>{
        //     this.box.scale.z = this.config.depth
        // });
        // let folder2 = this.gui.addFolder( '颜色' );
        // folder2.addColor(this.config, 'color').onChange(()=>{
        //     (this.box.material as THREE.MeshPhongMaterial).color = new THREE.Color(this.config.color)
        // });

        // this.gui.remember(this.config)
        // this.gui.revert(this.gui)
    }

    initLight() {

        this.ambLight = new THREE.AmbientLight(0xffffff);
        this.scene.add( this.ambLight );

        // this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // this.dirLight.position.set(0.5, 1, 0.2);
        // this.scene.add(this.dirLight);
    }
    
    

    enterFrame () {
        requestAnimationFrame(this.enterFrame.bind(this));

        let i = 0
        let temp
        let minPos = this.particleConfig.minPos
        let maxPos = this.particleConfig.maxPos
        for(i=0;i<this.particles.length;i++){
            temp = this.particles[i]
            temp.px += temp.speedX * 0.05
            temp.py += temp.speedY * 0.05
            temp.pz += temp.speedZ * 0.05
            temp.prot += temp.speedRot * 180 / Math.PI * 0.05
            this.particleMaterial.rotation += temp.speedRot
            if (temp.px < minPos.x || temp.px > maxPos.x || 
                temp.py < minPos.y || temp.py > maxPos.y || 
                temp.pz < minPos.z || temp.pz > maxPos.z){
                this.resetParticle(temp)
            }
        }

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