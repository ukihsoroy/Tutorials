#!/usr/bin/env node
const path = require('path')
const execa = require('execa')
const fs = require('fs')
const logUtils = require('./util/logUtils')

async function magnoVueWidget (options) {
  if (options.prod === true) {
    process.env.PACKAGECWD = process.cwd()
    const packageinfo = JSON.parse(fs.readFileSync(`${process.env.PACKAGECWD}/src/widget/packageinfo.json`, 'utf8'))
    process.env.WIDGETNAME = packageinfo.widgetApi[0].name
    process.chdir(path.resolve(__dirname, './magno-vue-widget'))
    execa(`poi --prod --config poi.build.js && gulp --gulpfile gulp.convert.js`, [], { stdio: 'inherit' })
  }
}

module.exports = (...args) => {
  return magnoVueWidget(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to execute magno vue-widget', err)
  })
}
