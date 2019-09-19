#!/usr/bin/env node
const path = require('path')
const execa = require('execa')
const fs = require('fs')

async function magnoComponent (options) {
  process.env.PACKAGECWD = process.cwd()
  const packageinfo = JSON.parse(fs.readFileSync(`${process.env.PACKAGECWD}/package.json`, 'utf8'))
  process.env.PACKAGENAME = packageinfo.name
  process.chdir(path.resolve(__dirname, 'magno-component'))
  if (options.serve === true) {
    execa('poi --serve --config poi.dev.js', [], { stdio: 'inherit' })
  }
  if (options.prod === true) {
    execa('poi --prod --config poi.build.js', [], { stdio: 'inherit' })
  }
}

module.exports = (...args) => {
  return magnoComponent(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to execute magno componenet' + err)
  })
}
