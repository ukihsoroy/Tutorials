const inquirer = require('inquirer')
const execa = require('execa')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const logUtils = require('./util/logUtils')

const {
  ROOTPATH,
  PACKAGETYPE,
  STANDARDPAGEASSETSPATH,
  ADVANCEDPAGEASSETSPATH,
  COMPONENTTEMPLATEPATH,
  WIDGETTEMPLATEPATH,
  WIDGETCOMPONENTTEMPLATEPATH
} = require('./util/consts')

async function addPackage () {
  logUtils.info('magno_assets_starter info adding a package')

  const {
    packgeType,
    packageName
  } = await inquirer.prompt([{
    name: 'packgeType',
    message: 'Select package type:',
    type: 'list',
    choices: [{
      name: 'widget',
      value: PACKAGETYPE.WIDGET
    },
    {
      name: 'widget(Vue single file component)',
      value: PACKAGETYPE.WIDGETCOMPONENT
    },
    {
      name: 'component',
      value: PACKAGETYPE.COMPONENT
    }
    ]
  },
  {
    name: 'packageName',
    message: 'Input package name:',
    type: 'input'
  }
  ])

  !fs.existsSync(STANDARDPAGEASSETSPATH) && mkdirp.sync(STANDARDPAGEASSETSPATH)
  !fs.existsSync(ADVANCEDPAGEASSETSPATH) && mkdirp.sync(ADVANCEDPAGEASSETSPATH)

  process.chdir(packgeType === PACKAGETYPE.COMPONENT ? STANDARDPAGEASSETSPATH : ADVANCEDPAGEASSETSPATH)
  const vueinitArgs = [packgeType === PACKAGETYPE.COMPONENT ? COMPONENTTEMPLATEPATH : (packgeType === PACKAGETYPE.WIDGET ? WIDGETTEMPLATEPATH : WIDGETCOMPONENTTEMPLATEPATH), `${packageName}`]
  await execa('vue init', vueinitArgs, {
    stdio: 'inherit'
  })
  if (packgeType === PACKAGETYPE.COMPONENT) {
    fs.renameSync(path.resolve(process.cwd(), `${packageName}/src/components/component`), path.resolve(process.cwd(), `${packageName}/src/components/${packageName}`))
  }
  process.chdir(ROOTPATH)
  logUtils.info(`magno_assets_starter info ${packageName} added successfully`)
  process.exit()
}

module.exports = (...args) => {
  return addPackage(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to add a package', err)
  })
}
