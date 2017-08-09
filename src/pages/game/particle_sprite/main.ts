import * as THREE from 'three'
import Stats from 'three/examples/js/libs/stats.min'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/controls/DeviceOrientationControls'
import dat from 'dat-gui'
import Particle from './Particle'
declare function require(string): string;
var imgSrc = require('@/assets/chong.png')
var imgSrc2 = require('@/assets/logo.png')

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

    private particleMaterial: THREE.Material
    private particleGeometry: THREE.Geometry
    
    private animationFrameLength: number = 40
    private uniforms: any
    private clock = new THREE.Clock();
    private targetFrame: number = 0;
    private rate = 0

    private particleConfig = {
        "textures": [
            "resource/chong.png"
        ],
        "number": 100,
        "minPos": {
            "x": -200,
            "y": -200,
            "z": -200,
            "w": 1
        },
        "maxPos": {
            "x": 200,
            "y": 200,
            "z": 200,
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
        this.renderer.setClearColor(new THREE.Color(0x333333), 1)
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
    createShaderMaterial () {
        var vertexshader = 
            `varying vec4 mcolor;
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = 1000.0 / gl_Position.w;
                mcolor = vec4(color.r,color.g,color.b, 1.0);
            }`;
        var fragmentShader = 
            `varying vec4 mcolor;
            uniform sampler2D texture;
            uniform vec2 offset;
            uniform vec2 repeat;
            uniform float tframe;
            void main() {
                vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
                vec2 pos = vec2(floor(mcolor.r * 7.0)/8.0, mcolor.a);
                float temp = mod(floor(mcolor.r * 40.0) + tframe, 40.0);
                vec4 color0 = texture2D( texture, uv * repeat + vec2( mod(temp,8.0) / 8.0, 1.0-((1.0+floor(temp/8.0))/5.0) ) );
                gl_FragColor = color0;
            }`
        this.uniforms = {
            texture: {type: 't', value: THREE.ImageUtils.loadTexture(imgSrc)},
            offset: {type: 'v2', value: new THREE.Vector2(0.0, 0.0)},
            repeat: {type: 'v2', value: new THREE.Vector2(1/8, 1/5)},
            tframe: {type: 'float', value: this.targetFrame},
        }
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexshader,
            fragmentShader: fragmentShader,
            transparent: true,
            vertexColors: THREE.VertexColors
            // blending: THREE.AdditiveBlending
        })

        return shaderMaterial
    }
    updateUniforms () {
        // var theta = this.clock.getElapsedTime()  * 1.5
        // var index = ((theta * 8 % 8)) | 0
        // index /= 8;
        if(this.targetFrame>=this.animationFrameLength) this.targetFrame = 0
        // console.log(index)
        this.uniforms.offset.value = new THREE.Vector2( this.targetFrame%8/8 , 1-((1+Math.floor(this.targetFrame/8))/5))
        this.uniforms.tframe.value = this.targetFrame
        this.targetFrame++
    }
    initParticle () {
        this.particleGeometry = new THREE.Geometry();
        let i = 0
        for ( i = 0; i < this.particleConfig['number']; i ++ ) {
            var vertex = new THREE.Vector3();
            let minPos = this.particleConfig.minPos
            let maxPos = this.particleConfig.maxPos
            vertex.x = this.randomFloat(minPos.x, maxPos.x);
            vertex.y = this.randomFloat(minPos.x, maxPos.x);
            vertex.z = this.randomFloat(minPos.x, maxPos.x);
            this.particleGeometry.vertices.push( vertex );
        }
        // vertex colors
        let colors: THREE.Color[] = [];
        for( i = 0; i < this.particleGeometry.vertices.length; i++ ) {
            // random color
            colors[i] = new THREE.Color();
            colors[i].setHSL( Math.random(), 1.0, 0.5 );
        }
        this.particleGeometry.colors = colors;
        // this.defaultMaterial = new THREE.CanvasTexture( this.generateSprite() );
        this.particleMaterial = new THREE.PointsMaterial({
            map: THREE.ImageUtils.loadTexture(imgSrc2),
            // depthTest: false,
            // blending: THREE.AdditiveBlending,
            transparent: true
        })
        // this.particleMaterial = this.createShaderMaterial()
        this.particleMaterial.alphaTest = 0.5
        this.particleContainer = new THREE.Group()
        let particle
        for ( i = 0; i < 1; i++) {
            particle = new Particle(this.particleGeometry, this.particleMaterial)
            // this.firstSetParticle(particle)
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
        // let temp
        // let minPos = this.particleConfig.minPos
        // let maxPos = this.particleConfig.maxPos
        // for(i=0;i<this.particles.length;i++){
        //     temp = this.particles[i]
        //     temp.px += temp.speedX * 0.05
        //     temp.py += temp.speedY * 0.05
        //     temp.pz += temp.speedZ * 0.05
        //     temp.prot += temp.speedRot * 180 / Math.PI * 0.05
        //     // this.particleMaterial.rotation += temp.speedRot
        //     if (temp.px < minPos.x || temp.px > maxPos.x || 
        //         temp.py < minPos.y || temp.py > maxPos.y || 
        //         temp.pz < minPos.z || temp.pz > maxPos.z){
        //         this.resetParticle(temp)
        //     }
        // }

        let vertex = this.particleGeometry.vertices
        for ( i = 0; i < vertex.length; i ++ ) {
            // vertex[i].x += 1.0 * 0.05
            vertex[i].y += -1.0 * 0.05
            // vertex[i].z += 1.0 * 0.05
        }
        // this.particleGeometry.verticesNeedUpdate = true;

        // var time = this.clock.getDelta() * 1000
        // this.rate += time
        // if(this.rate > 1000/20){
        //     this.updateUniforms()
        //     this.rate = 0
        // }

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