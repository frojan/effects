import * as THREE from 'three'
import Stats from 'three/examples/js/libs/stats.min'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/controls/DeviceOrientationControls'
declare function require(string): string;

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

    private particle: THREE.Points
    private particleMaterial: THREE.Material
    private particleGeometry: THREE.Geometry
    
    private animationFrameLength: number = 40
    private uniforms: any
    private clock = new THREE.Clock();
    private targetFrame: number = 0;
    private rate = 0
    private props: any[] = []

    private particleConfig = {
        "textures": [
            "chong.png"
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
            "x": -0.1,
            "y": -0.1,
            "z": -0.1,
            "w": 1
        },
        "maxSpeed": {
            "x": 0.1,
            "y": 0.1,
            "z": 0.1,
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
        // this.controls = new THREE.OrbitControls( this.camera, this.gameArea );
        this.controls = new THREE.DeviceOrientationControls( this.camera );

        this.initLight()
        this.initObj()
        this.initParticle()
        
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
            uniform vec2 repeat;
            uniform float tframe;
            void main() {
                vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
                vec2 pos = vec2(floor(mcolor.r * 7.0)/8.0, mcolor.a);
                float temp = mod(floor(mcolor.r * 40.0) + tframe, 40.0);
                vec4 color0 = texture2D( texture, uv * repeat + vec2( mod(temp,8.0) / 8.0, 1.0-((1.0+floor(temp/8.0))/5.0) ) );
                gl_FragColor = color0;
            }`

        var imgSrc = require(`@/assets/${this.particleConfig.textures[0]}`)
        this.uniforms = {
            texture: {type: 't', value: THREE.ImageUtils.loadTexture(imgSrc)},
            repeat: {type: 'v2', value: new THREE.Vector2(1/8, 1/5)},
            tframe: {type: 'float', value: this.targetFrame},
        }
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexshader,
            fragmentShader: fragmentShader,
            transparent: true,
            vertexColors: THREE.VertexColors,
            depthTest: false,
            blending: THREE.AdditiveBlending
        })

        return shaderMaterial
    }
    updateUniforms () {
        if(this.targetFrame>=this.animationFrameLength) this.targetFrame = 0
        this.uniforms.tframe.value = this.targetFrame
        this.targetFrame++
    }
    initParticle () {
        this.particleGeometry = new THREE.Geometry();
        let i = 0
        for ( i = 0; i < this.particleConfig['number']; i ++ ) {
            this.props[i] = {}
            this.resetParticle(this.props[i])
            let vertex = new THREE.Vector3();
            vertex.x = this.props[i].x;
            vertex.y = this.props[i].y;
            vertex.z = this.props[i].z;
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

        // this.particleMaterial = new THREE.PointsMaterial({
        //     map: THREE.ImageUtils.loadTexture(imgSrc),
        //     depthTest: false,
        //     blending: THREE.AdditiveBlending,
        //     transparent: true,
        //     alphaTest: 0.5
        // })

        this.particleMaterial = this.createShaderMaterial()
        this.particle = new THREE.Points(this.particleGeometry, this.particleMaterial)   
        this.scene.add(this.particle)
    }

    resetParticle (obj: any) {
        let minPos = this.particleConfig.minPos
        let maxPos = this.particleConfig.maxPos
        obj.x = this.randomFloat(minPos.x, maxPos.x);
        obj.y = this.randomFloat(minPos.y, maxPos.y);
        obj.z = this.randomFloat(minPos.z, maxPos.z);
        let minSpeed = this.particleConfig.minSpeed
        let maxSpeed = this.particleConfig.maxSpeed
        obj.vx = this.randomFloat(minSpeed.x, maxSpeed.x);
        obj.vy = this.randomFloat(minSpeed.y, maxSpeed.y);
        obj.vz = this.randomFloat(minSpeed.z, maxSpeed.z);
    }
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
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
        let minPos = this.particleConfig.minPos
        let maxPos = this.particleConfig.maxPos
        let vertex = this.particleGeometry.vertices
        for ( i = 0; i < vertex.length; i ++ ) {
            vertex[i].x += this.props[i].vx
            vertex[i].y += this.props[i].vy
            vertex[i].z += this.props[i].vz
            if (vertex[i].x < minPos.x || vertex[i].x > maxPos.x || 
                vertex[i].y < minPos.y || vertex[i].y > maxPos.y || 
                vertex[i].z < minPos.z || vertex[i].z > maxPos.z){
                this.resetParticle(this.props[i])
                vertex[i].x = this.props[i].x
                vertex[i].y = this.props[i].y
                vertex[i].z = this.props[i].z
            }
        }
        this.particleGeometry.verticesNeedUpdate = true;

        let time = this.clock.getDelta() * 1000
        this.rate += time
        if(this.rate > 1000/20){
            this.updateUniforms()
            this.rate = 0
        }

        this.controls.update();
        this.renderer.render( this.scene, this.camera )
        this.stats.update();
    }
}

export default App