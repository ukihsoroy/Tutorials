const inquirer = require('inquirer')
const execa = require('execa')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const fs = require('fs')
const logUtils = require('./util/logUtils')
const apiUtils = require('./util/apiUtils')
const {
  ROOTPATH,
  ADVANCEDPAGEASSETSPATH,
  WIDGETTEMPLATEPATH,
  WIDGETCOMPONENTTEMPLATEPATH
} = require('./util/consts')

const createProject = async widget => {
  if (widget) {
    const pluginDetails = JSON.parse(widget.pluginDetails)
    const zipFileURL = pluginDetails.zipFileURL
    const {
      zipTempName,
      widgetZip,
      widgetName,
      isVuecomponent
    } = await apiUtils.downloadWidget(zipFileURL)
    if (isVuecomponent) {
      if (fs.existsSync(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/widget`)) {
        widgetZip.extractAllTo(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/widget`, true)
        fs.copyFileSync(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/widget/${widgetName}.vue`, `${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/${widgetName}.vue`)
        fs.copyFileSync(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/widget/${widgetName}.json`, `${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/${widgetName}.json`)
        rimraf.sync(zipTempName)
        logUtils.info(`Download ${widgetName} to ${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/widget successfully`)
      } else {
        !fs.existsSync(ADVANCEDPAGEASSETSPATH) && mkdirp.sync(ADVANCEDPAGEASSETSPATH)
        process.chdir(ADVANCEDPAGEASSETSPATH)
        const vueinitArgs = [WIDGETCOMPONENTTEMPLATEPATH, `${widgetName.toLowerCase()}`]
        logUtils.info('When some questions are poped up,  press enter key to skip')
        await execa('vue init', vueinitArgs, {
          stdio: 'inherit'
        })
        rimraf.sync(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/widget`)
        widgetZip.extractAllTo(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/widget`, true)
        fs.copyFileSync(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/widget/${widgetName}.vue`, `${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/${widgetName}.vue`)
        fs.copyFileSync(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/widget/${widgetName}.json`, `${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/src/${widgetName}.json`)
        rimraf.sync(zipTempName)
        process.chdir(ROOTPATH)
        logUtils.info(`create ${widgetName.toLowerCase()} in ${ADVANCEDPAGEASSETSPATH} successfully`)
      }
    } else {
      if (fs.existsSync(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/widget`)) {
        widgetZip.extractAllTo(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/widget`, true)
        rimraf.sync(zipTempName)
        logUtils.info(`Download ${widgetName} to ${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/widget successfully`)
      } else {
        !fs.existsSync(ADVANCEDPAGEASSETSPATH) && mkdirp.sync(ADVANCEDPAGEASSETSPATH)
        process.chdir(ADVANCEDPAGEASSETSPATH)
        const vueinitArgs = [WIDGETTEMPLATEPATH, `${widgetName.toLowerCase()}`]
        logUtils.info('When some questions are poped up,  press enter key to skip')
        await execa('vue init', vueinitArgs, {
          stdio: 'inherit'
        })
        rimraf.sync(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/widget/*`)
        widgetZip.extractAllTo(`${ADVANCEDPAGEASSETSPATH}/${widgetName.toLowerCase()}/widget`, true)
        rimraf.sync(zipTempName)
        process.chdir(ROOTPATH)
        logUtils.info(`create ${widgetName.toLowerCase()} in ${ADVANCEDPAGEASSETSPATH} successfully`)
      }
    }
  }
}

async function downloadwidget () {
  await apiUtils.setToken()
  const {
    widgetLibraryArray,
    widgetLibraryMap
  } = await apiUtils.getWidgetNameList()
  const {
    selectedType,
    inputwidgetNames,
    selectedwidgetNames
  } = await inquirer.prompt([{
    name: 'selectedType',
    message: 'Select the input type:',
    type: 'list',
    pageSize: 20,
    choices: [{
      name: 'Input the libraryId of widget',
      value: 1
    },
    {
      name: 'Select the libraryId of widget',
      value: 2
    }
    ]
  },
  {
    name: 'inputwidgetNames',
    message: 'Input the libraryId of widget to download:',
    when: function (answers) {
      return answers.selectedType === 1
    },
    filter: function (val) {
      return val.trim()
    }
  },
  {
    name: 'selectedwidgetNames',
    message: 'Select the libraryId of widget to download:',
    type: 'checkbox',
    pageSize: 20,
    choices: widgetLibraryArray,
    when: function (answers) {
      return answers.selectedType === 2
    }
  }
  ])
  if (selectedType === 1 && inputwidgetNames) {
    if (widgetLibraryMap[inputwidgetNames]) {
      await createProject(widgetLibraryMap[inputwidgetNames])
    } else {
      logUtils.warning(`The widget of libraryId ${inputwidgetNames} does not exist`)
    }
  } else if (selectedType === 2 && selectedwidgetNames.length > 0) {
    const selectedwidgetNamesLength = selectedwidgetNames.length
    let index = 0
    while (index < selectedwidgetNamesLength) {
      await createProject(widgetLibraryMap[selectedwidgetNames[index]])
      index++
    }
  }
  process.exit()
}

module.exports = (...args) => {
  return downloadwidget(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to download package', err)
  })
}
