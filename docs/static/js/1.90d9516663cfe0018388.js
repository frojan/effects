webpackJsonp([1],{

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tube__ = __webpack_require__(29);

var App = (function () {
    function App() {
        this.tubes = [];
        this.targetIndex = 0;
        this.score = 0;
        this.numDie = 0;
        this.gravity = 0.2;
        this.flySpeedY = 0;
        this.gameover = false;
        this.renderer = PIXI.autoDetectRenderer(App.SCREEN_WIDTH, App.SCREEN_HEIGHT, {
            antialias: true,
            transparent: false,
            resolution: 1,
            forceCanvas: true
        });
        this.renderer.view.style.width = App.SCREEN_WIDTH + 'px';
        this.renderer.view.style.height = App.SCREEN_HEIGHT + 'px';
        var gameArea = document.querySelector('.game-area');
        gameArea.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        // this.stage.scale.set(10)
        // this.renderer.resize(App.SCREEN_WIDTH*10, App.SCREEN_HEIGHT*10)
        this.initBg();
        this.createTube();
        this.initBird();
        this.initPanel();
        this.enterFrame();
    }
    App.prototype.initBg = function () {
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x000000);
        this.bg.drawRect(0, 0, App.SCREEN_WIDTH, App.SCREEN_HEIGHT);
        this.bg.endFill();
        this.bg.x = 0;
        this.bg.y = 0;
        this.stage.addChild(this.bg);
    };
    App.prototype.createTube = function () {
        var tube;
        var lastPosx = App.SCREEN_WIDTH;
        for (var i = 0; i < App.NUM; i++) {
            tube = new __WEBPACK_IMPORTED_MODULE_0__Tube__["a" /* default */](lastPosx);
            this.stage.addChild(tube);
            this.tubes.push(tube);
            lastPosx += 150;
        }
    };
    App.prototype.initBird = function () {
        this.bird = new PIXI.Graphics();
        this.bird.beginFill(0xffffff);
        this.bird.drawRect(0, 0, 20, 20);
        this.bird.endFill();
        this.bird.x = App.SCREEN_WIDTH * 0.5;
        this.bird.y = App.SCREEN_HEIGHT * 0.5;
        this.bird.pivot.x = this.bird.width / 2;
        this.bird.pivot.y = this.bird.height / 2;
        this.stage.addChild(this.bird);
        this.stage.interactive = true;
        this.stage.on('pointerdown', this.onDown.bind(this));
    };
    App.prototype.onDown = function (event) {
        this.flySpeedY = -4;
        this.gameover = false;
    };
    App.prototype.initPanel = function () {
        this.scorePanel = new PIXI.Text("\u5206\u6570\uFF1A" + this.score, {
            fontFamily: "Arial",
            fontSize: 20,
            fill: "white"
        });
        this.scorePanel.x = 0;
        this.scorePanel.y = 0;
        this.stage.addChild(this.scorePanel);
    };
    App.prototype.scoreUpdate = function () {
        this.scorePanel.text = "score: " + this.score + "\ndie: " + this.numDie;
    };
    App.prototype.enterFrame = function () {
        requestAnimationFrame(this.enterFrame.bind(this));
        this.flySpeedY += this.gravity;
        this.bird.y += this.flySpeedY;
        if (!this.gameover) {
            for (var i = 0; i < this.tubes.length; i++) {
                if (this.hitTube(this.tubes[i], this.bird)) {
                    this.numDie++;
                    this.gameover = true;
                    return;
                }
                this.tubes[i].update();
                if (this.tubes[i].x < -this.tubes[i].width) {
                    this.tubes[i].init(this.tubes[i === 0 ? this.tubes.length - 1 : i - 1].x + 150);
                }
            }
            if (this.bird.y >= App.SCREEN_HEIGHT) {
                this.numDie++;
                this.gameover = true;
            }
            if (this.bird.x - this.bird.width * .5 > this.tubes[this.targetIndex].x + this.tubes[this.targetIndex].width) {
                this.targetIndex = (this.targetIndex + 1) % this.tubes.length;
                this.score++;
            }
        }
        if (this.bird.y >= App.SCREEN_HEIGHT) {
            this.bird.y = App.SCREEN_HEIGHT;
        }
        this.scoreUpdate();
        this.renderer.render(this.stage);
    };
    App.prototype.hitTube = function (tube, bird) {
        var upTube = tube.getChildAt(0);
        var downTube = tube.getChildAt(1);
        var hit = false;
        var up = {
            x: tube.x + tube.width * .5,
            y: upTube.y + upTube.height * .5,
            width: tube.width,
            height: upTube.height
        };
        var down = {
            x: tube.x + tube.width * .5,
            y: downTube.y + downTube.height * .5,
            width: tube.width,
            height: downTube.height
        };
        if (this.hitTestRectangle(up, bird)) {
            hit = true;
            // console.log('hit up')
        }
        else if (this.hitTestRectangle(down, bird)) {
            hit = true;
            // console.log('hit down')
        }
        return hit;
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
    App.NUM = 5;
    App.SCREEN_WIDTH = document.documentElement.clientWidth;
    App.SCREEN_HEIGHT = document.documentElement.clientHeight;
    return App;
}());
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ 29:
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
var Tube = (function (_super) {
    __extends(Tube, _super);
    function Tube(x) {
        var _this = _super.call(this) || this;
        _this.vx = 1;
        _this.tubeUp = new PIXI.Graphics();
        _this.tubeDown = new PIXI.Graphics();
        _this.addChild(_this.tubeUp);
        _this.addChild(_this.tubeDown);
        _this.init(x);
        return _this;
    }
    Tube.prototype.init = function (x) {
        var space = 100;
        var minHeight = 100;
        var height = Math.floor(Math.random() * (Tube.SCREEN_HEIGHT - space - minHeight * 2) + minHeight);
        var color = 0xffffff * Math.random();
        this.tubeUp.clear();
        this.tubeUp.beginFill(color);
        this.tubeUp.drawRect(0, 0, 40, height);
        this.tubeUp.endFill();
        this.tubeUp.x = 0;
        this.tubeUp.y = 0;
        this.tubeDown.clear();
        this.tubeDown.beginFill(color);
        this.tubeDown.drawRect(0, 0, 40, Tube.SCREEN_HEIGHT - space - height);
        this.tubeDown.endFill();
        this.tubeDown.x = 0;
        this.tubeDown.y = Tube.SCREEN_HEIGHT - this.tubeDown.height;
        this.x = x;
    };
    Tube.prototype.update = function () {
        this.x -= this.vx;
    };
    Tube.SCREEN_WIDTH = document.documentElement.clientWidth;
    Tube.SCREEN_HEIGHT = document.documentElement.clientHeight;
    return Tube;
}(PIXI.Container));
/* harmony default export */ __webpack_exports__["a"] = (Tube);


/***/ })

});
//# sourceMappingURL=1.90d9516663cfe0018388.js.map