const path = require('path')
const execa = require('execa')
const logUtils = require('./util/logUtils')

async function magnoWidget (options) {
  process.env.PACKAGECWD = process.cwd()
  process.chdir(path.resolve(__dirname, './magno-widget'))
  let gulpfile = './script/gulppreviewfile.js'
  if (options.prod === true) {
    gulpfile = './script/gulpbuildfile.js'
  }
  execa(`gulp --gulpfile ${gulpfile}`, [], { stdio: 'inherit' })
}

module.exports = (...args) => {
  return magnoWidget(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to execute magno widget', err)
  })
}
