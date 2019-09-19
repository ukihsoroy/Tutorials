const fs = require('fs')
const path = require('path')
const semver = require('semver')
const CopyPlugin = require('copy-webpack-plugin')
const ZipWebpackPlugin = require('zip-webpack-plugin')
const _ = require('lodash')
const commonUtils = require('./utils')

module.exports = {
  entry: {},
  output: {
    format: 'umd',
    moduleName: process.env.PACKAGENAME,
    html: false,
    dir: path.resolve(process.env.PACKAGECWD, 'dist')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(process.env.PACKAGECWD, 'src/')
      }
    }
  },
  chainWebpack (config) {
    const manifestPath = path.resolve(process.env.PACKAGECWD, 'src/manifest.json')
    const manifest = require(manifestPath)
    manifest.version = semver.inc(manifest.version, 'patch')
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

    _.get(manifest, 'package.components', []).forEach(fileName => {
      const dirName = path.dirname(fileName)
      const jsonDef = require(path.resolve(path.join(process.env.PACKAGECWD + '/src', fileName)))

      let props = [
        'main', // 组件运行态
        'mainDesignTime', // 组件设计态
        'customPanel', // 自定义面板
        'customPropertyEditor' // 属性编辑器
      ]

      props
        .filter(file => file in jsonDef && jsonDef[file])
        .map(file => ({
          name: path.posix.join(dirName, jsonDef[file].replace(/\.\w+$/, '')),
          value: path.posix.join('@', dirName, jsonDef[file])
        }))
        .forEach(({
          name,
          value
        }) => config.entry(name).add(value))
    })
    config.plugin('copy').use(CopyPlugin, [
      [{
        context: path.resolve(process.env.PACKAGECWD, 'src'),
        from: '*.*',
        ignore: ['*.json']
      },
      {
        context: path.resolve(process.env.PACKAGECWD, 'src'),
        from: '**/*.json',
        transform (content, filePath) {
          return new Buffer(commonUtils.inlineImageFromJson(content.toString(), path.dirname(filePath), 10000))
        }
      }
      ]
    ])

    config.plugin('zip').use(ZipWebpackPlugin, [{
      filename: manifest.name
    }])
    const distPath = path.resolve(process.env.PACKAGECWD, '../../../dist/standardPageAssets')
    console.log(distPath)
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, {
        recursive: true
      })
    }
    const re = fs.createReadStream(path.resolve(process.env.PACKAGECWD, `dist/${manifest.name}.zip`))
    const wr = fs.createWriteStream(path.resolve(distPath, `${manifest.name}.zip`))
    re.pipe(wr)
  }
}
