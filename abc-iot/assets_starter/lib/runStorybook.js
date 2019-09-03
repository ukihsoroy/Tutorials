const path = require('path')
const execa = require('execa')

async function runStorybook () {
  process.chdir(path.resolve(__dirname, '../'))
  execa(`start-storybook`, [], { stdio: 'inherit' })
}

module.exports = (...args) => {
  return runStorybook(...args).catch(err => {
    process.exit(1)
  })
}
