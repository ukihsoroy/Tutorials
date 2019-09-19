const path = require('path')
const fs = require('fs')
const execa = require('execa')
const logUtils = require('./util/logUtils')
const { POIDEVFILE, POIBUILDFILE } = require('./util/consts')

async function magnoTheme (options) {
  process.env.PACKAGECWD = process.cwd()
  if (options.serve === true) {
    if (fs.existsSync(POIDEVFILE)) {
      execa(`poi --serve --config ${POIDEVFILE}`, [], { stdio: 'inherit' })
    } else {
      logUtils.error(`${POIDEVFILE} does not exist in the ${process.env.PACKAGECWD}`)
    }
  }
  if (options.prod === true) {
    if (fs.existsSync(POIBUILDFILE)) {
      await execa(`poi --prod --config ${POIBUILDFILE}`, [], { stdio: 'inherit' })
      process.chdir(path.resolve(__dirname, './magno-theme'))
      await execa(`gulp --gulpfile gulpcopyfiles.js`, [], { stdio: 'inherit' })
    } else {
      logUtils.error(`${POIBUILDFILE} does not exist in the ${process.env.PACKAGECWD}`)
    }
  }
}

module.exports = (...args) => {
  return magnoTheme(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to execute magno theme', err)
  })
}
