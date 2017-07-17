# first-blood

> 我喜欢的你都有

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 疑问：
1. 引用src目录下的js会报'--allowJs' is not set
引用node_modules的不会报？
2. pixi和three.js 声明文件写法不同导致用three.js时必须需import，用pixi时不需要
3. noImplicitAny 设置为true, 引用的stats.min.js报错?
