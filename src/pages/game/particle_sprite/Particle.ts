import * as THREE from 'three'

class Particle extends THREE.Mesh{

    public speedX: number = 0
    public speedY: number = 0
    public speedZ: number = 0
    public speedRot: number = 0
    public boomSpeed: number = 0
    public lastUpdateTime: number = 0
    
    private uniforms: any
    
    get px():number {
        return this.position.x;
    }
    set px(val:number) {
        this.position.x = val;
    }
    get py():number {
        return this.position.y;
    }
    set py(val:number) {
        this.position.y = val;
    }
    get pz():number {
        return this.position.z;
    }
    set pz(val:number) {
        this.position.z = val;
    }
    get psize():number {
        return (this.material as THREE.ShaderMaterial).uniforms.scale.value.x;
    }
    set psize(val:number) {
        (this.material as THREE.ShaderMaterial).uniforms.scale.value = new THREE.Vector3(val, val, val)
    }
    get prot():number {
        return (this.material as THREE.ShaderMaterial).uniforms.rotation.value
    }
    set prot(val:number) {
        (this.material as THREE.ShaderMaterial).uniforms.rotation.value = val
    }

    get targetFrame():number {
        return (this.material as THREE.ShaderMaterial).uniforms.frame.value
    }
    set targetFrame(val:number) {
        (this.material as THREE.ShaderMaterial).uniforms.frame.value = val
    }

    constructor(material){
        super(new THREE.PlaneGeometry(1, 1), material)
    }
}

export default Particle