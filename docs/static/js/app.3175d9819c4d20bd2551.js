webpackJsonp([3],[,,function(t,e,n){"use strict";var a=n(1),r=n(17),i=n(13),o=n.n(i),s=n(12),c=n.n(s);a.a.use(r.a),e.a=new r.a({routes:[{path:"/",name:"home",component:o.a},{path:"/:path",name:"game",component:c.a}]})},function(t,e){},function(t,e,n){function a(t){n(10)}var r=n(0)(n(6),n(15),a,null,null);t.exports=r.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),r=n(4),i=n.n(r),o=n(2),s=n(3);n.n(s);a.a.config.productionTip=!1,new a.a({el:"#app",router:o.a,template:"<App/>",components:{App:i.a}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"hello",data:function(){return{}},mounted:function(){var t=this.$route.params.path;n(21)("./"+t+"/main").then(function(t){new(0,t.default)})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(20),r=n.n(a);e.default={name:"hello",data:function(){return{msg:"Welcome",listConfig:r.a}}}},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){function a(t){n(11)}var r=n(0)(n(7),n(16),a,"data-v-b037a4cc",null);t.exports=r.exports},function(t,e,n){function a(t){n(9)}var r=n(0)(n(8),n(14),a,"data-v-57d0ccf2",null);t.exports=r.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},t._l(t.listConfig,function(e,a){return n("section",{key:a,staticClass:"category"},[n("div",{staticClass:"title"},[t._v(t._s(a))]),t._v(" "),n("ul",{staticClass:"list"},t._l(e,function(e){return n("li",{key:e.path},[n("router-link",{attrs:{to:e.path}},[t._v(t._s(e.name))])],1)}))])}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"game-area"})])}]}},,,,function(t,e){t.exports={pixi:[{name:"节点动画",path:"nodeAni"},{name:"接物游戏",path:"fallGame"},{name:"flappy bird",path:"flappyBird"}],"three.js":[]}},function(t,e,n){function a(t){var e=r[t];return e?n.e(e[1]).then(function(){return n(e[0])}):Promise.reject(new Error("Cannot find module '"+t+"'."))}var r={"./fallGame/main":[22,2],"./flappyBird/main":[23,1],"./nodeAni/main":[24,0]};a.keys=function(){return Object.keys(r)},t.exports=a,a.id=21}],[5]);
//# sourceMappingURL=app.3175d9819c4d20bd2551.js.map