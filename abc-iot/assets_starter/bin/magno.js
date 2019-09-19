#!/usr/bin/env node

const chalk = require('chalk')
const minimist = require('minimist')
const program = require('commander')

process.env.CURR_DIR = process.cwd()

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new project powered by magno_assets_starter')
  .action((name, cmd) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
    }
    require('../lib/createApp')(name)
  })

program
  .command('add')
  .description('create a new package in the packages directory')
  .action(() => {
    require('../lib/addPackge')()
  })

program
  .command('storybook')
  .description('preview the components using storybook')
  .action(() => {
    require('../lib/runStorybook.js')()
  })

program
  .command('build')
  .description('build all the packages')
  .action(() => {
    require('../lib/buildPackage.js')()
  })

program
  .command('download')
  .description('download a widget from gallery')
  .action(() => {
    require('../lib/downloadWidget.js')()
  })

program
  .command('publish')
  .description('publish a widget to gallery')
  .action(() => {
    require('../lib/publishWidget.js')()
  })

program
  .command('theme')
  .description('preview or build the theme library, execute the command in the theme-chalk package')
  .option('-s, --serve', 'preview the theme library')
  .option('-p, --prod', 'build the theme library')
  .action((cmd) => {
    const options = cleanArgs(cmd)
    require('../lib/magnoTheme.js')(options)
  })

program
  .command('widget')
  .description('preview or build the widget, execute the command in the widget package')
  .option('-s, --serve', 'preview the widget')
  .option('-p, --prod', 'build the widget')
  .action((cmd) => {
    const options = cleanArgs(cmd)
    require('../lib/magnoWidget.js')(options)
  })

program
  .command('vue-widget')
  .description('preview or build the widget(Single File Component), execute the command in the widget(Single File Component) package')
  .option('-p, --prod', 'build the widget')
  .action((cmd) => {
    const options = cleanArgs(cmd)
    require('../lib/magnoVueWidget.js')(options)
  })

program
  .command('component')
  .description('preview or build the component, execute the command in the component package')
  .option('-s, --serve', 'preview the component')
  .option('-p, --prod', 'build the component')
  .action((cmd) => {
    const options = cleanArgs(cmd)
    require('../lib/magnoComponent.js')(options)
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`magno <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
