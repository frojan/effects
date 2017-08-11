import * as THREE from 'three'
import Stats from 'three/examples/js/libs/stats.min'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/controls/DeviceOrientationControls'
import dat from 'dat-gui'
import Particle from './Particle'
declare function require(string): string;
var imgSrc = require('@/assets/chong.png')

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

    private particleMaterial: THREE.Material
    private particleGeometry: THREE.Geometry

    private uniforms: any
    private clock = new THREE.Clock()

    private canvasWidth: number = 1200 * 0.5
    private canvasHeight: number = 1200 * 0.5

    private particleConfig = {
        "textures": [
            "resource/chong.png"
        ],
        "number": 1000,
        "minPos": {
            "x": -50,
            "y": -50,
            "z": -50,
            "w": 1
        },
        "maxPos": {
            "x": 50,
            "y": 50,
            "z": 50,
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
        "isNeedChangeDir": false,
        "minUpdateFrameSpeed": 10,
        "maxUpdateFrameSpeed": 20,
        "scale": 1,
        "frameCountPerRow": 8,
        "particleFrameCount": 40,
        "isNeedKeepDir": false     // 没用
    }

    private config: FizzyText
    private gui: dat.GUI

    constructor () {
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setClearColor(new THREE.Color(0x333333), 1)
        this.renderer.setSize( this.canvasWidth, this.canvasHeight );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.stats = new Stats();
        this.gameArea = <HTMLElement>document.querySelector('.game-area')
        if(this.gameArea) {
            this.gameArea.appendChild(this.renderer.domElement)
            this.gameArea.appendChild(this.stats.dom);
        }
        
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera( 75, this.canvasWidth / this.canvasHeight, 1, 10000 );
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
    createShaderMaterial (texture) {
        var vertexshader = 
            `varying vec2 fUV;
            uniform vec3 scale;
            uniform float rotation;

            void main() {
                fUV = uv;
                vec3 alignedPosition = position * scale;

                vec2 rotatedPosition;
                rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
                rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

                vec4 finalPosition;

                finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
                finalPosition.xy += rotatedPosition;
                finalPosition = projectionMatrix * finalPosition;

                gl_Position =  finalPosition;
            }`;
        var fragmentShader = 
            `varying vec2 fUV;
            uniform sampler2D texture;
            uniform float frame;
            uniform vec3 frameData;
            void main() {
                vec2 uv = vec2(1.0 - fUV.x, 1.0 - fUV.y);
                vec2 repeat = vec2(1.0/frameData.x, 1.0/frameData.y);
                float temp = mod(frame, frameData.z);
                vec4 color0 = texture2D( texture, uv * repeat + vec2( mod(temp,frameData.x) / frameData.x, 1.0-((1.0+floor(temp/frameData.x))/frameData.y) ) );
                gl_FragColor = color0;
            }`
        this.uniforms = {
            texture: {type: 't', value: texture},
            scale: {type: 'v3', value: new THREE.Vector3(1,1,1)},
            rotation: {type: 'float', value: 0},
            frame: {type: 'float', value: 0.0},
            frameData: {type: 'v3', value: new THREE.Vector3(this.particleConfig.frameCountPerRow,Math.ceil(this.particleConfig.particleFrameCount/this.particleConfig.frameCountPerRow),this.particleConfig.particleFrameCount)}
        }
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexshader,
            fragmentShader: fragmentShader,
            transparent: true,
            vertexColors: THREE.VertexColors
            // depthTest: false,
            // blending: THREE.AdditiveBlending
        })

        return shaderMaterial
    }
    initParticle () {
        this.particleContainer = new THREE.Group()
        let particle
        let i = 0
        let material
        let texture = new THREE.TextureLoader().load(imgSrc)
        for ( i = 0; i < this.particleConfig['number']; i++) {
            material = this.createShaderMaterial(texture)
            particle = new Particle(material)
            this.resetParticle(particle)
            this.particleContainer.add(particle)
            this.particles.push(particle)
        }

        this.scene.add(this.particleContainer)
    }

    resetParticle (particle: Particle) {
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
        particle.speedRot = this.randomFloat(0, this.particleConfig.maxRotSpeed)
        particle.boomSpeed = this.randomFloat(0.5, 1) * (this.particleConfig.maxUpdateFrameSpeed - this.particleConfig.minUpdateFrameSpeed) + this.particleConfig.minUpdateFrameSpeed
        particle.psize = this.particleConfig.scale;
        particle.targetFrame = Math.floor(this.randomFloat(0, this.particleConfig.particleFrameCount))
    }
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    updateParticles(){
        let i = 0
        let particle
        for ( i = 0; i < this.particleConfig['number']; i++) {
            particle = this.particles[i]
            this.resetParticle(particle)
        }
    }

    clearPartices () {
        this.scene.remove(this.particleContainer)
        this.particles = []
    }

    initGUI () {
        let myjson = {}
        this.config = new FizzyText();
        this.gui = new dat.GUI({ autoPlace: false, load: myjson });
        (this.gameArea.parentElement as HTMLElement).appendChild(this.gui.domElement)
        this.gui.domElement.style.cssText = 'position: absolute; left: 0; top: 0; margin-left: 600px';
        let folder1 = this.gui.addFolder( '最小位置' );
        folder1.add(this.particleConfig.minPos, 'x').onChange(()=>{
            this.updateParticles()
        });
        folder1.add(this.particleConfig.minPos, 'y').onChange(()=>{
            this.updateParticles()
        });
        folder1.add(this.particleConfig.minPos, 'z').onChange(()=>{
            this.updateParticles()
        });
        let folder2 = this.gui.addFolder( '最大位置' );
        folder2.add(this.particleConfig.maxPos, 'x').onChange(()=>{
            this.updateParticles()
        });
        folder2.add(this.particleConfig.maxPos, 'y').onChange(()=>{
            this.updateParticles()
        });
        folder2.add(this.particleConfig.maxPos, 'z').onChange(()=>{
            this.updateParticles()
        });
        let folder3 = this.gui.addFolder( '最小速度' );
        folder3.add(this.particleConfig.minSpeed, 'x').onChange(()=>{
            this.updateParticles()
        });
        folder3.add(this.particleConfig.minSpeed, 'y').onChange(()=>{
            this.updateParticles()
        });
        folder3.add(this.particleConfig.minSpeed, 'z').onChange(()=>{
            this.updateParticles()
        });
        let folder4 = this.gui.addFolder( '最大速度' );
        folder4.add(this.particleConfig.maxSpeed, 'x').onChange(()=>{
            this.updateParticles()
        });
        folder4.add(this.particleConfig.maxSpeed, 'y').onChange(()=>{
            this.updateParticles()
        });
        folder4.add(this.particleConfig.maxSpeed, 'z').onChange(()=>{
            this.updateParticles()
        });

        let other = this.gui.addFolder( '其他' );
        other.add(this.particleConfig, 'number').step(1).onChange(()=>{
            // 跟新粒子数量
            this.clearPartices()
            this.initParticle()
        });
        other.add(this.particleConfig, 'scale').onChange(()=>{
            this.updateParticles()
        });
        other.add(this.particleConfig, 'maxRotSpeed').onChange(()=>{
            this.updateParticles()
        });
        other.add(this.particleConfig, 'isHaveLife').onChange(()=>{   
        });
        other.add(this.particleConfig, 'isNeedChangeDir').onChange(()=>{     
        });
        other.add(this.particleConfig, 'minUpdateFrameSpeed').onChange(()=>{
            this.updateParticles()
        });
        other.add(this.particleConfig, 'maxUpdateFrameSpeed').onChange(()=>{
            this.updateParticles()
        });
        other.add(this.particleConfig, 'frameCountPerRow').step(1).onChange(()=>{
            // 更新材质
            this.clearPartices()
            this.initParticle()
        });
        other.add(this.particleConfig, 'particleFrameCount').step(1).onChange(()=>{
            // 更新材质
            this.clearPartices()
            this.initParticle()
        });

        // this.gui.remember(this.config)
        this.gui.revert(this.gui)
    }

    initLight() {

        this.ambLight = new THREE.AmbientLight(0xffffff);
        this.scene.add( this.ambLight );

        // this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // this.dirLight.position.set(0.5, 1, 0.2);
        // this.scene.add(this.dirLight);
    }
    clampFun (val, min, max) {
        let cha = max-min
        if(val < min){
            val = (val-min)%(max-min) + max
        }else if(val > max){
            val = (val-max)%(max-min) + min
        }
        return val
    }
    
    enterFrame () {
        requestAnimationFrame(this.enterFrame.bind(this));

        let time = Date.now() * 0.001
        let intervalTime
        let i = 0
        let temp
        let minPos = this.particleConfig.minPos
        let maxPos = this.particleConfig.maxPos
        let totalFrame =  this.particleConfig.particleFrameCount
        let hasLife = this.particleConfig.isHaveLife
        let needChangeDir = this.particleConfig.isNeedChangeDir
        for(i = 0; i < this.particles.length; i++){
            temp = this.particles[i]
            intervalTime = time - temp.lastUpdateTime
            if (intervalTime < temp.boomSpeed * 0.001) continue;
            if ((temp.targetFrame+1) % totalFrame === 0){
                if(hasLife){
                    temp.px = this.randomFloat(minPos.x, maxPos.x);
                    temp.py = this.randomFloat(minPos.y, maxPos.y);
                    temp.pz = this.randomFloat(minPos.z, maxPos.z);
                }
                if(needChangeDir){
                    let minSpeed = this.particleConfig.minSpeed
                    let maxSpeed = this.particleConfig.maxSpeed
                    temp.speedX = this.randomFloat(minSpeed.x, maxSpeed.x);
                    temp.speedY = this.randomFloat(minSpeed.y, maxSpeed.y);
                    temp.speedZ = this.randomFloat(minSpeed.z, maxSpeed.z);
                }
                temp.boomSpeed = this.randomFloat(0.5, 1) * (this.particleConfig.maxUpdateFrameSpeed - this.particleConfig.minUpdateFrameSpeed) + this.particleConfig.minUpdateFrameSpeed
            }
            temp.px += temp.speedX * intervalTime
            temp.py += temp.speedY * intervalTime
            temp.pz += temp.speedZ * intervalTime
            temp.prot += temp.speedRot * intervalTime
            
            temp.px = this.clampFun(temp.px, minPos.x, maxPos.x)
            temp.py = this.clampFun(temp.py, minPos.y, maxPos.y)
            temp.pz = this.clampFun(temp.pz, minPos.z, maxPos.z)
            temp.prot = this.clampFun(temp.prot, 0, Math.PI * 2)

            temp.targetFrame++
            temp.lastUpdateTime = time
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