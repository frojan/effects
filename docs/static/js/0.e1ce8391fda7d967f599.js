webpackJsonp([0],{24:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(29),i=function(){function t(){this.arrs=[],this.renderer=new PIXI.CanvasRenderer(t.SCREEN_WIDTH,t.SCREEN_HEIGHT,{antialias:!0,transparent:!1,resolution:1}),document.querySelector(".game-area").appendChild(this.renderer.view),this.stage=new PIXI.Container,this.lineGraph=new PIXI.Graphics,this.stage.addChild(this.lineGraph),this.creatCircles(),this.enterFrame()}return t.prototype.creatCircles=function(){var e,r=new PIXI.filters.BlurFilter;r.blur=3;for(var i=0;i<t.NUM;i++)e=new n.a(Math.random()*this.renderer.width,Math.random()*this.renderer.height,5),e.filters=[r],this.arrs.push(e),this.stage.addChild(e)},t.prototype.enterFrame=function(){requestAnimationFrame(this.enterFrame.bind(this));var e;for(e=0;e<t.NUM;e++)this.arrs[e].update();for(this.lineGraph.clear(),e=0;e<t.NUM-1;e++)for(var r=e+1;r<t.NUM;r++)this.connectCircle(this.arrs[e],this.arrs[r]);this.renderer.render(this.stage)},t.prototype.connectCircle=function(e,r){var n=e.x-r.x,i=e.y-r.y,s=Math.sqrt(n*n+i*i);if(s<t.minDist){this.lineGraph.lineStyle(1,16777215,s/t.minDist),this.lineGraph.moveTo(e.x,e.y),this.lineGraph.lineTo(r.x,r.y);var a=n*t.springAmount,o=i*t.springAmount;r.vx+=a,r.vy+=o,e.vx-=a,e.vy-=o}},t.NUM=35,t.SCREEN_WIDTH=document.documentElement.clientWidth,t.SCREEN_HEIGHT=document.documentElement.clientHeight,t.minDist=100,t.springAmount=.001,t}();e.default=i},29:function(t,e,r){"use strict";var n=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),i=function(t){function e(e,r,n){var i=t.call(this)||this;return i.vx=6*Math.random()-3,i.vy=6*Math.random()-3,i.beginFill(16777215*Math.random()),i.drawCircle(0,0,n),i.endFill(),i.x=e,i.y=r,i}return n(e,t),e.prototype.update=function(){this.x+=this.vx,this.y+=this.vy,this.x>e.SCREEN_WIDTH?this.x=0:this.x<0&&(this.x=e.SCREEN_WIDTH),this.y>e.SCREEN_HEIGHT?this.y=0:this.y<0&&(this.y=e.SCREEN_HEIGHT)},e.SCREEN_WIDTH=document.documentElement.clientWidth,e.SCREEN_HEIGHT=document.documentElement.clientHeight,e}(PIXI.Graphics);e.a=i}});
//# sourceMappingURL=0.e1ce8391fda7d967f599.js.map