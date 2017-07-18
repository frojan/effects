webpackJsonp([0],{22:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(35),i=(n.n(o),n(33)),a=n.n(i),r=n(32),s=(n.n(r),n(31)),c=(n.n(s),n(36)),d=n.n(c);console.log(d.a);var l=function(){function e(){this.renderer=new o.WebGLRenderer({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.stats=new a.a,this.gameArea=document.querySelector(".game-area"),this.gameArea&&(this.gameArea.appendChild(this.renderer.domElement),this.gameArea.appendChild(this.stats.dom)),this.scene=new o.Scene,this.camera=new o.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e4),this.camera.position.z=10,this.controls=new o.OrbitControls(this.camera,this.gameArea),this.initGUI(),this.initLight(),this.initObject(),this.enterFrame()}return e.prototype.initGUI=function(){var e=this,t=new h;this.gui=new d.a.GUI({autoPlace:!1}),this.gameArea.parentElement.appendChild(this.gui.domElement),this.gui.domElement.style.cssText="position: absolute; right: 0; top: 0; margin-right: 10px";var n=this.gui.addFolder("大小");n.add(t,"width",1,10).step(.1).onChange(function(){e.box.scale.x=t.width}),n.add(t,"heigth",1,10).onChange(function(){e.box.scale.y=t.heigth}),n.add(t,"depth",1,10).onChange(function(){e.box.scale.z=t.depth}),this.gui.addFolder("颜色").addColor(t,"color").onChange(function(){e.box.material.color=new o.Color(t.color)})},e.prototype.initLight=function(){this.ambLight=new o.AmbientLight(16777215),this.scene.add(this.ambLight)},e.prototype.initObject=function(){var e=new o.BoxGeometry(1,1,1),t=new o.MeshPhongMaterial({color:65535});this.box=new o.Mesh(e,t),this.box.position.set(0,0,0),this.scene.add(this.box)},e.prototype.enterFrame=function(){requestAnimationFrame(this.enterFrame.bind(this)),this.controls.update(),this.renderer.render(this.scene,this.camera),this.stats.update()},e.NUM=20,e.SCREEN_WIDTH=document.documentElement.clientWidth,e.SCREEN_HEIGHT=document.documentElement.clientHeight,e}();t.default=l;var h=function(){function e(){this.width=1,this.heigth=1,this.depth=1,this.color=65535}return e}()},31:function(e,t){THREE.DeviceOrientationControls=function(e){var t=this;this.object=e,this.object.rotation.reorder("YXZ"),this.enabled=!0,this.deviceOrientation={},this.screenOrientation=0,this.alpha=0,this.alphaOffsetAngle=0;var n=function(e){t.deviceOrientation=e},o=function(){t.screenOrientation=window.orientation||0},i=function(){var e=new THREE.Vector3(0,0,1),t=new THREE.Euler,n=new THREE.Quaternion,o=new THREE.Quaternion(-Math.sqrt(.5),0,0,Math.sqrt(.5));return function(i,a,r,s,c){t.set(r,a,-s,"YXZ"),i.setFromEuler(t),i.multiply(o),i.multiply(n.setFromAxisAngle(e,-c))}}();this.connect=function(){o(),window.addEventListener("orientationchange",o,!1),window.addEventListener("deviceorientation",n,!1),t.enabled=!0},this.disconnect=function(){window.removeEventListener("orientationchange",o,!1),window.removeEventListener("deviceorientation",n,!1),t.enabled=!1},this.update=function(){if(!1!==t.enabled){var e=t.deviceOrientation.alpha?THREE.Math.degToRad(t.deviceOrientation.alpha)+this.alphaOffsetAngle:0,n=t.deviceOrientation.beta?THREE.Math.degToRad(t.deviceOrientation.beta):0,o=t.deviceOrientation.gamma?THREE.Math.degToRad(t.deviceOrientation.gamma):0,a=t.screenOrientation?THREE.Math.degToRad(t.screenOrientation):0;i(t.object.quaternion,e,n,o,a),this.alpha=e}},this.updateAlphaOffsetAngle=function(e){this.alphaOffsetAngle=e,this.update()},this.dispose=function(){this.disconnect()},this.connect()}},32:function(e,t){THREE.OrbitControls=function(e,t){function n(){return 2*Math.PI/60/60*S.autoRotateSpeed}function o(){return Math.pow(.95,S.zoomSpeed)}function i(e){Z.theta-=e}function a(e){Z.phi-=e}function r(e){S.object instanceof THREE.PerspectiveCamera?I/=e:S.object instanceof THREE.OrthographicCamera?(S.object.zoom=Math.max(S.minZoom,Math.min(S.maxZoom,S.object.zoom*e)),S.object.updateProjectionMatrix(),X=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),S.enableZoom=!1)}function s(e){S.object instanceof THREE.PerspectiveCamera?I*=e:S.object instanceof THREE.OrthographicCamera?(S.object.zoom=Math.max(S.minZoom,Math.min(S.maxZoom,S.object.zoom/e)),S.object.updateProjectionMatrix(),X=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),S.enableZoom=!1)}function c(e){_.set(e.clientX,e.clientY)}function d(e){Q.set(e.clientX,e.clientY)}function l(e){W.set(e.clientX,e.clientY)}function h(e){G.set(e.clientX,e.clientY),B.subVectors(G,_);var t=S.domElement===document?S.domElement.body:S.domElement;i(2*Math.PI*B.x/t.clientWidth*S.rotateSpeed),a(2*Math.PI*B.y/t.clientHeight*S.rotateSpeed),_.copy(G),S.update()}function u(e){J.set(e.clientX,e.clientY),$.subVectors(J,Q),$.y>0?r(o()):$.y<0&&s(o()),Q.copy(J),S.update()}function m(e){q.set(e.clientX,e.clientY),K.subVectors(q,W),ne(K.x,K.y),W.copy(q),S.update()}function p(e){}function E(e){e.deltaY<0?s(o()):e.deltaY>0&&r(o()),S.update()}function b(e){switch(e.keyCode){case S.keys.UP:ne(0,S.keyPanSpeed),S.update();break;case S.keys.BOTTOM:ne(0,-S.keyPanSpeed),S.update();break;case S.keys.LEFT:ne(S.keyPanSpeed,0),S.update();break;case S.keys.RIGHT:ne(-S.keyPanSpeed,0),S.update()}}function f(e){_.set(e.touches[0].pageX,e.touches[0].pageY)}function g(e){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,o=Math.sqrt(t*t+n*n);Q.set(0,o)}function v(e){W.set(e.touches[0].pageX,e.touches[0].pageY)}function w(e){G.set(e.touches[0].pageX,e.touches[0].pageY),B.subVectors(G,_);var t=S.domElement===document?S.domElement.body:S.domElement;i(2*Math.PI*B.x/t.clientWidth*S.rotateSpeed),a(2*Math.PI*B.y/t.clientHeight*S.rotateSpeed),_.copy(G),S.update()}function R(e){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,i=Math.sqrt(t*t+n*n);J.set(0,i),$.subVectors(J,Q),$.y>0?s(o()):$.y<0&&r(o()),Q.copy(J),S.update()}function T(e){q.set(e.touches[0].pageX,e.touches[0].pageY),K.subVectors(q,W),ne(K.x,K.y),W.copy(q),S.update()}function O(e){}function y(e){if(!1!==S.enabled){switch(e.preventDefault(),e.button){case S.mouseButtons.ORBIT:if(!1===S.enableRotate)return;c(e),z=U.ROTATE;break;case S.mouseButtons.ZOOM:if(!1===S.enableZoom)return;d(e),z=U.DOLLY;break;case S.mouseButtons.PAN:if(!1===S.enablePan)return;l(e),z=U.PAN}z!==U.NONE&&(document.addEventListener("mousemove",H,!1),document.addEventListener("mouseup",P,!1),S.dispatchEvent(k))}}function H(e){if(!1!==S.enabled)switch(e.preventDefault(),z){case U.ROTATE:if(!1===S.enableRotate)return;h(e);break;case U.DOLLY:if(!1===S.enableZoom)return;u(e);break;case U.PAN:if(!1===S.enablePan)return;m(e)}}function P(e){!1!==S.enabled&&(p(e),document.removeEventListener("mousemove",H,!1),document.removeEventListener("mouseup",P,!1),S.dispatchEvent(D),z=U.NONE)}function x(e){!1===S.enabled||!1===S.enableZoom||z!==U.NONE&&z!==U.ROTATE||(e.preventDefault(),e.stopPropagation(),E(e),S.dispatchEvent(k),S.dispatchEvent(D))}function C(e){!1!==S.enabled&&!1!==S.enableKeys&&!1!==S.enablePan&&b(e)}function j(e){if(!1!==S.enabled){switch(e.touches.length){case 1:if(!1===S.enableRotate)return;f(e),z=U.TOUCH_ROTATE;break;case 2:if(!1===S.enableZoom)return;g(e),z=U.TOUCH_DOLLY;break;case 3:if(!1===S.enablePan)return;v(e),z=U.TOUCH_PAN;break;default:z=U.NONE}z!==U.NONE&&S.dispatchEvent(k)}}function M(e){if(!1!==S.enabled)switch(e.preventDefault(),e.stopPropagation(),e.touches.length){case 1:if(!1===S.enableRotate)return;if(z!==U.TOUCH_ROTATE)return;w(e);break;case 2:if(!1===S.enableZoom)return;if(z!==U.TOUCH_DOLLY)return;R(e);break;case 3:if(!1===S.enablePan)return;if(z!==U.TOUCH_PAN)return;T(e);break;default:z=U.NONE}}function A(e){!1!==S.enabled&&(O(e),S.dispatchEvent(D),z=U.NONE)}function L(e){!1!==S.enabled&&e.preventDefault()}this.object=e,this.domElement=void 0!==t?t:document,this.enabled=!0,this.target=new THREE.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.25,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={ORBIT:THREE.MOUSE.LEFT,ZOOM:THREE.MOUSE.MIDDLE,PAN:THREE.MOUSE.RIGHT},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return V.phi},this.getAzimuthalAngle=function(){return V.theta},this.saveState=function(){S.target0.copy(S.target),S.position0.copy(S.object.position),S.zoom0=S.object.zoom},this.reset=function(){S.target.copy(S.target0),S.object.position.copy(S.position0),S.object.zoom=S.zoom0,S.object.updateProjectionMatrix(),S.dispatchEvent(N),S.update(),z=U.NONE},this.update=function(){var t=new THREE.Vector3,o=(new THREE.Quaternion).setFromUnitVectors(e.up,new THREE.Vector3(0,1,0)),a=o.clone().inverse(),r=new THREE.Vector3,s=new THREE.Quaternion;return function(){var e=S.object.position;return t.copy(e).sub(S.target),t.applyQuaternion(o),V.setFromVector3(t),S.autoRotate&&z===U.NONE&&i(n()),V.theta+=Z.theta,V.phi+=Z.phi,V.theta=Math.max(S.minAzimuthAngle,Math.min(S.maxAzimuthAngle,V.theta)),V.phi=Math.max(S.minPolarAngle,Math.min(S.maxPolarAngle,V.phi)),V.makeSafe(),V.radius*=I,V.radius=Math.max(S.minDistance,Math.min(S.maxDistance,V.radius)),S.target.add(Y),t.setFromSpherical(V),t.applyQuaternion(a),e.copy(S.target).add(t),S.object.lookAt(S.target),!0===S.enableDamping?(Z.theta*=1-S.dampingFactor,Z.phi*=1-S.dampingFactor):Z.set(0,0,0),I=1,Y.set(0,0,0),!!(X||r.distanceToSquared(S.object.position)>F||8*(1-s.dot(S.object.quaternion))>F)&&(S.dispatchEvent(N),r.copy(S.object.position),s.copy(S.object.quaternion),X=!1,!0)}}(),this.dispose=function(){S.domElement.removeEventListener("contextmenu",L,!1),S.domElement.removeEventListener("mousedown",y,!1),S.domElement.removeEventListener("wheel",x,!1),S.domElement.removeEventListener("touchstart",j,!1),S.domElement.removeEventListener("touchend",A,!1),S.domElement.removeEventListener("touchmove",M,!1),document.removeEventListener("mousemove",H,!1),document.removeEventListener("mouseup",P,!1),window.removeEventListener("keydown",C,!1)};var S=this,N={type:"change"},k={type:"start"},D={type:"end"},U={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_DOLLY:4,TOUCH_PAN:5},z=U.NONE,F=1e-6,V=new THREE.Spherical,Z=new THREE.Spherical,I=1,Y=new THREE.Vector3,X=!1,_=new THREE.Vector2,G=new THREE.Vector2,B=new THREE.Vector2,W=new THREE.Vector2,q=new THREE.Vector2,K=new THREE.Vector2,Q=new THREE.Vector2,J=new THREE.Vector2,$=new THREE.Vector2,ee=function(){var e=new THREE.Vector3;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),Y.add(e)}}(),te=function(){var e=new THREE.Vector3;return function(t,n){e.setFromMatrixColumn(n,1),e.multiplyScalar(t),Y.add(e)}}(),ne=function(){var e=new THREE.Vector3;return function(t,n){var o=S.domElement===document?S.domElement.body:S.domElement;if(S.object instanceof THREE.PerspectiveCamera){var i=S.object.position;e.copy(i).sub(S.target);var a=e.length();a*=Math.tan(S.object.fov/2*Math.PI/180),ee(2*t*a/o.clientHeight,S.object.matrix),te(2*n*a/o.clientHeight,S.object.matrix)}else S.object instanceof THREE.OrthographicCamera?(ee(t*(S.object.right-S.object.left)/S.object.zoom/o.clientWidth,S.object.matrix),te(n*(S.object.top-S.object.bottom)/S.object.zoom/o.clientHeight,S.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),S.enablePan=!1)}}();S.domElement.addEventListener("contextmenu",L,!1),S.domElement.addEventListener("mousedown",y,!1),S.domElement.addEventListener("wheel",x,!1),S.domElement.addEventListener("touchstart",j,!1),S.domElement.addEventListener("touchend",A,!1),S.domElement.addEventListener("touchmove",M,!1),window.addEventListener("keydown",C,!1),this.update()},THREE.OrbitControls.prototype=Object.create(THREE.EventDispatcher.prototype),THREE.OrbitControls.prototype.constructor=THREE.OrbitControls,Object.defineProperties(THREE.OrbitControls.prototype,{center:{get:function(){return console.warn("THREE.OrbitControls: .center has been renamed to .target"),this.target}},noZoom:{get:function(){return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),!this.enableZoom},set:function(e){console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),this.enableZoom=!e}},noRotate:{get:function(){return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),!this.enableRotate},set:function(e){console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),this.enableRotate=!e}},noPan:{get:function(){return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),!this.enablePan},set:function(e){console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),this.enablePan=!e}},noKeys:{get:function(){return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),!this.enableKeys},set:function(e){console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),this.enableKeys=!e}},staticMoving:{get:function(){return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),!this.enableDamping},set:function(e){console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),this.enableDamping=!e}},dynamicDampingFactor:{get:function(){return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor},set:function(e){console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor=e}}})},33:function(e,t){var n=function(){function e(e){return i.appendChild(e.dom),e}function t(e){for(var t=0;t<i.children.length;t++)i.children[t].style.display=t===e?"block":"none";o=e}var o=0,i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",i.addEventListener("click",function(e){e.preventDefault(),t(++o%i.children.length)},!1);var a=(performance||Date).now(),r=a,s=0,c=e(new n.Panel("FPS","#0ff","#002")),d=e(new n.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=e(new n.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:i,addPanel:e,showPanel:t,begin:function(){a=(performance||Date).now()},end:function(){s++;var e=(performance||Date).now();if(d.update(e-a,200),e>r+1e3&&(c.update(1e3*s/(e-r),100),r=e,s=0,l)){var t=performance.memory;l.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){a=this.end()},domElement:i,setMode:t}};n.Panel=function(e,t,n){var o=1/0,i=0,a=Math.round,r=a(window.devicePixelRatio||1),s=80*r,c=48*r,d=3*r,l=2*r,h=3*r,u=15*r,m=74*r,p=30*r,E=document.createElement("canvas");E.width=s,E.height=c,E.style.cssText="width:80px;height:48px";var b=E.getContext("2d");return b.font="bold "+9*r+"px Helvetica,Arial,sans-serif",b.textBaseline="top",b.fillStyle=n,b.fillRect(0,0,s,c),b.fillStyle=t,b.fillText(e,d,l),b.fillRect(h,u,m,p),b.fillStyle=n,b.globalAlpha=.9,b.fillRect(h,u,m,p),{dom:E,update:function(c,f){o=Math.min(o,c),i=Math.max(i,c),b.fillStyle=n,b.globalAlpha=1,b.fillRect(0,0,s,u),b.fillStyle=t,b.fillText(a(c)+" "+e+" ("+a(o)+"-"+a(i)+")",d,l),b.drawImage(E,h+r,u,m-r,p,h,u,m-r,p),b.fillRect(h+m-r,u,r,p),b.fillStyle=n,b.globalAlpha=.9,b.fillRect(h+m-r,u,r,a((1-c/f)*p))}}},"object"==typeof e&&(e.exports=n)}});
//# sourceMappingURL=0.db2c2a079d66719fa8c2.js.map