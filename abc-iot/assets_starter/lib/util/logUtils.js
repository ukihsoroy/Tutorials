const chalk = require('chalk')
const log = console.log

const info = (message) => log(chalk.yellow(message))
const warning = (message) => {
  log(chalk.keyword('orange')(message))
  process.exit(1)
}
const error = (message) => {
  log(chalk.bold.red(message))
  process.exit(1)
}

module.exports = {
  info,
  warning,
  error
}
