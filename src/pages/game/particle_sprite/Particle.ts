import * as THREE from 'three'

class Particle extends THREE.Points{

    public speedX: number = 0
    public speedY: number = 0
    public speedZ: number = 0
    public speedRot: number = 0
    
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
        return this.scale.x;
    }
    set psize(val:number) {
        this.scale.x = this.scale.y = val;
    }
    get prot():number {
        return this.rotation.z
    }
    set prot(val:number) {
        this.rotation.z = val;
    }

    constructor(geometry: THREE.Geometry, material: THREE.Material){
        super(geometry, material)
    }

    update () {

    }
}

export default Particle