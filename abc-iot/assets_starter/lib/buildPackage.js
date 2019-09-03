const execa = require('execa')
const rimraf = require('rimraf')
const logUtils = require('./util/logUtils')
const { ROOTPATH, DISTPATH } = require('./util/consts')

async function buildPackage () {
  rimraf.sync(DISTPATH)
  process.chdir(ROOTPATH)
  await execa('lerna run build --npm-client=yarn --parallel', [], {
    stdio: 'inherit'
  })
}

module.exports = (...args) => {
  return buildPackage(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to build packages', err)
  })
}
