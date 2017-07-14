webpackJsonp([0],{

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Circle__ = __webpack_require__(30);

var App = (function () {
    function App() {
        this.arrs = [];
        // this.renderer = PIXI.autoDetectRenderer(App.SCREEN_WIDTH, App.SCREEN_HEIGHT, 
        // {
        //     antialias: true, 
        //     transparent: false, 
        //     resolution: 1
        // });
        this.renderer = new PIXI.CanvasRenderer(App.SCREEN_WIDTH, App.SCREEN_HEIGHT, {
            antialias: true,
            transparent: false,
            resolution: 1
        });
        var gameArea = document.querySelector('.game-area');
        gameArea.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.lineGraph = new PIXI.Graphics();
        this.stage.addChild(this.lineGraph);
        this.creatCircles();
        this.enterFrame();
    }
    App.prototype.creatCircles = function () {
        var circle;
        var filter = new PIXI.filters.BlurFilter();
        filter.blur = 3;
        for (var i = 0; i < App.NUM; i++) {
            circle = new __WEBPACK_IMPORTED_MODULE_0__Circle__["a" /* default */](Math.random() * this.renderer.width, Math.random() * this.renderer.height, 5);
            circle.filters = [filter];
            this.arrs.push(circle);
            this.stage.addChild(circle);
        }
    };
    App.prototype.enterFrame = function () {
        requestAnimationFrame(this.enterFrame.bind(this));
        var i;
        var j;
        for (i = 0; i < App.NUM; i++) {
            // if(this.arrs[i].vx>9) this.arrs[i].vx = 9
            // if(this.arrs[i].vx<-9) this.arrs[i].vx = -9
            // if(this.arrs[i].vy>9) this.arrs[i].vy = 9
            // if(this.arrs[i].vy<-9) this.arrs[i].vy = -9
            this.arrs[i].update();
        }
        this.lineGraph.clear();
        for (i = 0; i < App.NUM - 1; i++) {
            for (var j_1 = i + 1; j_1 < App.NUM; j_1++) {
                this.connectCircle(this.arrs[i], this.arrs[j_1]);
            }
        }
        this.renderer.render(this.stage);
    };
    App.prototype.connectCircle = function (c1, c2) {
        var dx = c1.x - c2.x;
        var dy = c1.y - c2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        //If the distance between 2 nodes are smaller than minimum, connect them
        if (dist < App.minDist) {
            this.lineGraph.lineStyle(1, 0xFFFFFF, dist / App.minDist);
            this.lineGraph.moveTo(c1.x, c1.y);
            this.lineGraph.lineTo(c2.x, c2.y);
            var ax = dx * App.springAmount;
            var ay = dy * App.springAmount;
            // 控制相吸
            c2.vx += ax;
            c2.vy += ay;
            c1.vx -= ax;
            c1.vy -= ay;
            // 控制相斥
            // c2.vx -= ax;
            // c2.vy -= ay;
            // c1.vx += ax;
            // c1.vy += ay;
        }
    };
    App.NUM = 35;
    App.SCREEN_WIDTH = document.documentElement.clientWidth;
    App.SCREEN_HEIGHT = document.documentElement.clientHeight;
    App.minDist = 100;
    App.springAmount = 0.001;
    return App;
}());
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, radius) {
        var _this = _super.call(this) || this;
        _this.vx = Math.random() * 6 - 3;
        _this.vy = Math.random() * 6 - 3;
        _this.beginFill(0xffffff * Math.random());
        _this.drawCircle(0, 0, radius);
        _this.endFill();
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Circle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > Circle.SCREEN_WIDTH) {
            this.x = 0;
        }
        else if (this.x < 0) {
            this.x = Circle.SCREEN_WIDTH;
        }
        if (this.y > Circle.SCREEN_HEIGHT) {
            this.y = 0;
        }
        else if (this.y < 0) {
            this.y = Circle.SCREEN_HEIGHT;
        }
        // if (this.x > Circle.SCREEN_WIDTH) {
        //     this.vx = -Math.abs(this.vx)
        // } else if (this.x < 0) {
        //     this.vx = Math.abs(this.vx)
        // }
        // if (this.y > Circle.SCREEN_HEIGHT) {
        //     this.vy = -Math.abs(this.vy)
        // } else if (this.y < 0) {
        //     this.vy = Math.abs(this.vy)
        // }
    };
    Circle.SCREEN_WIDTH = document.documentElement.clientWidth;
    Circle.SCREEN_HEIGHT = document.documentElement.clientHeight;
    return Circle;
}(PIXI.Graphics));
/* harmony default export */ __webpack_exports__["a"] = (Circle);


/***/ })

});
//# sourceMappingURL=0.6dfddbce1eb05833a6c3.js.map