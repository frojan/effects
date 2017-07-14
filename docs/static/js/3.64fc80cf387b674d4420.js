webpackJsonp([3],{

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);

var App = (function () {
    function App() {
        this.mouseX = 0;
        this.score = 0;
        this.numCatch = 0;
        this.numMiss = 0;
        this.renderer = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderer"]();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        var gameArea = document.querySelector('.game-area');
        gameArea.appendChild(this.renderer.domElement);
        this.scene = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"]();
        this.camera = new __WEBPACK_IMPORTED_MODULE_0_three__["PerspectiveCamera"](75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 5;
        this.camera.position.y = 100;
        this.enterFrame();
    }
    App.prototype.enterFrame = function () {
        requestAnimationFrame(this.enterFrame.bind(this));
        this.renderer.render(this.scene, this.camera);
    };
    App.NUM = 20;
    App.SCREEN_WIDTH = document.documentElement.clientWidth;
    App.SCREEN_HEIGHT = document.documentElement.clientHeight;
    return App;
}());
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ })

});
//# sourceMappingURL=3.64fc80cf387b674d4420.js.map