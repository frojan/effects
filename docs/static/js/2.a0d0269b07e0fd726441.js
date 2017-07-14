webpackJsonp([2],{

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_pixi_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Food__ = __webpack_require__(28);


var App = (function () {
    function App() {
        this.foods = [];
        this.mouseX = 0;
        this.score = 0;
        this.numCatch = 0;
        this.numMiss = 0;
        this.renderer = __WEBPACK_IMPORTED_MODULE_0_pixi_js__["autoDetectRenderer"](App.SCREEN_WIDTH, App.SCREEN_HEIGHT, {
            antialias: true,
            transparent: false,
            resolution: 1
        });
        var gameArea = document.querySelector('.game-area');
        gameArea.appendChild(this.renderer.view);
        this.stage = new __WEBPACK_IMPORTED_MODULE_0_pixi_js__["Container"]();
        this.creatFoods();
        this.initBasket();
        this.initPanel();
        this.enterFrame();
    }
    App.prototype.creatFoods = function () {
        var food;
        for (var i = 0; i < App.NUM; i++) {
            food = new __WEBPACK_IMPORTED_MODULE_1__Food__["a" /* default */]();
            this.foods.push(food);
            this.stage.addChild(food);
        }
    };
    App.prototype.initBasket = function () {
        this.basket = new __WEBPACK_IMPORTED_MODULE_0_pixi_js__["Graphics"]();
        this.basket.beginFill(0xffffff);
        this.basket.drawRect(0, 0, 50, 20);
        this.basket.endFill();
        this.basket.x = 0;
        this.basket.y = App.SCREEN_HEIGHT - this.basket.height / 2;
        this.basket.pivot.x = this.basket.width / 2;
        this.basket.pivot.y = this.basket.height / 2;
        this.stage.addChild(this.basket);
        this.basket.interactive = true;
        this.basket.on('pointermove', this.onMove.bind(this));
    };
    App.prototype.onMove = function (event) {
        this.mouseX = event.data.global.x;
    };
    App.prototype.initPanel = function () {
        this.scorePanel = new __WEBPACK_IMPORTED_MODULE_0_pixi_js__["Text"]("\u5206\u6570\uFF1A" + this.score, {
            fontFamily: "Arial",
            fontSize: 20,
            fill: "white"
        });
        this.scorePanel.x = 0;
        this.scorePanel.y = 0;
        this.stage.addChild(this.scorePanel);
    };
    App.prototype.scoreUpdate = function () {
        this.scorePanel.text = "score: " + this.score + "\ncatch: " + this.numCatch + "\nmiss: " + this.numMiss;
    };
    App.prototype.enterFrame = function () {
        requestAnimationFrame(this.enterFrame.bind(this));
        this.basket.x = Math.max(Math.min(this.mouseX, App.SCREEN_WIDTH - this.basket.width / 2), this.basket.width / 2);
        for (var i = 0; i < App.NUM; i++) {
            this.foods[i].update();
            if (this.hitTestRectangle(this.foods[i], this.basket)) {
                this.numCatch++;
                this.score += this.foods[i].score;
                this.foods[i].init();
            }
            else if (this.foods[i].y >= App.SCREEN_HEIGHT + this.foods[i].height / 2) {
                this.numMiss++;
                this.foods[i].init();
            }
        }
        this.scoreUpdate();
        this.renderer.render(this.stage);
    };
    App.prototype.hitTestRectangle = function (c1, c2) {
        var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
        hit = false;
        vx = c1.x - c2.x;
        vy = c1.y - c2.y;
        combinedHalfWidths = c1.width * .5 + c2.width * .5;
        combinedHalfHeights = c1.height * .5 + c2.height * .5;
        if (Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
            hit = true;
        }
        else {
            hit = false;
        }
        return hit;
    };
    App.NUM = 20;
    App.SCREEN_WIDTH = document.documentElement.clientWidth;
    App.SCREEN_HEIGHT = document.documentElement.clientHeight;
    return App;
}());
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ 28:
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
var Food = (function (_super) {
    __extends(Food, _super);
    function Food() {
        var _this = _super.call(this) || this;
        _this.vy = Math.random() * 3 + 1;
        _this.score = 0;
        _this.init();
        return _this;
    }
    Food.prototype.init = function () {
        this.beginFill(0xffffff * Math.random());
        this.drawCircle(0, 0, 10);
        this.endFill();
        this.x = Food.SCREEN_WIDTH * Math.random();
        this.y = -Food.SCREEN_HEIGHT * Math.random();
        this.score = Math.round(Math.random() * 10);
    };
    Food.prototype.update = function () {
        this.y += this.vy;
    };
    Food.SCREEN_WIDTH = document.documentElement.clientWidth;
    Food.SCREEN_HEIGHT = document.documentElement.clientHeight;
    return Food;
}(PIXI.Graphics));
/* harmony default export */ __webpack_exports__["a"] = (Food);


/***/ })

});
//# sourceMappingURL=2.a0d0269b07e0fd726441.js.map