const gulp = require('gulp')
const browserSync = require('browser-sync')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const replace = require('gulp-replace')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')
const https = require('https')
const tunnel = require('tunnel')
const customConfig = require(path.resolve(process.env.PACKAGECWD, '../../../config'))
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpackconfig.js')
const { url, username, password } = customConfig

let agent = new https.Agent({
  rejectUnauthorized: false
})

if (url.includes('com')) {
  agent = tunnel.httpsOverHttp({
    proxy: {
      host: 'proxy.huawei.com',
      port: 8080
    }
  })
}

const proxyMiddleware = proxy(['/baas', '/service', '/u-route'], {
  target: url,
  changeOrigin: true,
  agent: agent
})

const addCrossOrigin = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
}

const bundler = webpack(webpackConfig.config)

let packageinfo = fs.readFileSync(process.env.PACKAGECWD + '/widget/packageinfo.json', 'utf8')
let widgetName = JSON.parse(packageinfo).widgetApi[0].name

let Studio = {
  registerWidget: () => {}
}

let STUDIO_PAGE_LEVEL_MACRO = {}

const getProperty = (propertiesConfig) => {
  let widgetProperty = {
    properties: {},
    connectorproperties: {}
  }
  propertiesConfig.forEach(function (propertyitem) {
    propertyitem.config.forEach(function (configitem) {
      let type = configitem.type
      let name = configitem.name
      if (type === 'connectorV2') {
        widgetProperty.properties[name] = configitem.value
        widgetProperty.connectorproperties[name] = {}
      } else if (type === 'select') {
        configitem.options.forEach(function (option) {
          if (option.selected === 'true') {
            widgetProperty.properties[name] = option.value
          }
        })
      } else {
        widgetProperty.properties[name] = configitem.value
        const execResult = /^(\$\{pm\.)(.*)(\})$/.exec(configitem.value)
        if (execResult) {
          const macroname = execResult[2]
          STUDIO_PAGE_LEVEL_MACRO[macroname] = { 'id': macroname, 'name': macroname, 'order': '0', 'defaultValue': '' }
        }
      }
    })
  })
  return widgetProperty
}

gulp.task('staticAssets', () => gulp.src(['../staticAssets/all.css', '../staticAssets/all.js', '../staticAssets/jquery.js', '../staticAssets/afterall.js'])
  .pipe(gulp.dest(process.env.PACKAGECWD + '/preview/'))
  .pipe(browserSync.stream())
)

gulp.task('staticAssetsLibrary', () => gulp.src(['../staticAssets/addlibrary.js'])
  .pipe(gulp.dest(process.env.PACKAGECWD + '/preview/', { overwrite: false }))
  .pipe(browserSync.stream())
)

gulp.task('staticAssetsReplace', () => gulp.src(['../staticAssets/beforeall.js'])
  .pipe(replace(/process.env.username/, username))
  .pipe(replace(/process.env.password/, password))
  .pipe(gulp.dest(process.env.PACKAGECWD + '/preview/'))
  .pipe(browserSync.stream())
)

gulp.task('library', () => gulp.src(['../staticAssets/library/**'])
  .pipe(gulp.dest(process.env.PACKAGECWD + '/preview/library', { overwrite: false }))
  .pipe(browserSync.stream())
)

gulp.task('html', () => {
  let ftlContent = fs.readFileSync(process.env.PACKAGECWD + `/widget/${widgetName}.ftl`, 'utf8')
  let editorjsContent = fs.readFileSync(process.env.PACKAGECWD + `/widget/${widgetName}.editor.js`, 'utf8')

  let extendIndex = editorjsContent.search(/\.extend/)
  eval(`var editorjs =` + editorjsContent.substr(extendIndex + '.extend'.length))
  let { properties, connectorproperties } = getProperty(editorjs.propertiesConfig)
  return gulp.src('../staticAssets/index.html')
    .pipe(replace(/\{widgetName\}/g, widgetName))
    .pipe(replace(/\{ftlContent\}/, ftlContent))
    .pipe(replace(/\{widgetProperty\}/g, JSON.stringify(properties)))
    .pipe(replace(/\{widgetConnectorProperty\}/g, JSON.stringify(connectorproperties)))
    .pipe(replace(/\{STUDIO_PAGE_LEVEL_MACRO\}/g, JSON.stringify(STUDIO_PAGE_LEVEL_MACRO)))
    .pipe(gulp.dest(process.env.PACKAGECWD + '/preview/'))
    .pipe(browserSync.stream())
}
)

gulp.task('widget', () => gulp.src(process.env.PACKAGECWD + '/widget/**')
  .pipe(gulp.dest(process.env.PACKAGECWD + '/preview/widget'))
  .pipe(browserSync.stream())
)

gulp.task('mock', () => gulp.src(process.env.PACKAGECWD + '/mock/**')
  .pipe(gulp.dest(process.env.PACKAGECWD + '/preview/mock'))
  .pipe(browserSync.stream())
)

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: process.env.PACKAGECWD + '/preview'
    },
    watch: true,
    https: true,
    browser: ['chrome.exe'],
    middleware: [
      webpackDevMiddleware(bundler, { /* options */ }),
      webpackHotMiddleware(bundler),
      proxyMiddleware,
      addCrossOrigin
    ]
  })
  // 使用replace 替换\分隔符为/, 否则watch不生效
  gulp.watch([(process.env.PACKAGECWD + '/widget/*.ftl').replace(/\\/g, '/'), (process.env.PACKAGECWD + '/widget/*.editor.js').replace(/\\/g, '/')], gulp.parallel('html'))
  gulp.watch((process.env.PACKAGECWD + '/widget/**').replace(/\\/g, '/'), gulp.parallel('widget'))
  gulp.watch((process.env.PACKAGECWD + '/mock/**').replace(/\\/g, '/'), gulp.parallel('mock'))
})

gulp.task('default', gulp.parallel('staticAssets', 'staticAssetsLibrary', 'staticAssetsReplace', 'library', 'html', 'widget', 'mock', 'watch'))
