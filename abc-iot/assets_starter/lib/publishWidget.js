const inquirer = require('inquirer')
const execa = require('execa')
const rimraf = require('rimraf')
const zipper = require('zip-local')
const fs = require('fs')
const path = require('path')
const logUtils = require('./util/logUtils')
const apiUtils = require('./util/apiUtils')
const {
  ROOTPATH,
  ADVANCEDPAGEASSETSPATH
} = require('./util/consts')

async function publishWidget () {
  const widgetOptions = []
  fs.readdirSync(ADVANCEDPAGEASSETSPATH).forEach(fileName => {
    if (fs.existsSync(`${ADVANCEDPAGEASSETSPATH}/${fileName}/widget/packageinfo.json`) || fs.existsSync(`${ADVANCEDPAGEASSETSPATH}/${fileName}/src/widget/packageinfo.json`)) {
      widgetOptions.push({
        name: fileName,
        value: fileName
      })
    }
  })
  const {
    selectedWidget
  } = await inquirer.prompt([{
    name: 'selectedWidget',
    message: 'Select a widget to publish:',
    type: 'list',
    pageSize: 20,
    choices: widgetOptions
  }])

  let packageinfo
  let widgetName
  const tempPath = path.resolve(__dirname, './temp')
  rimraf.sync(`${tempPath}`)
  fs.mkdirSync(tempPath)
  if (fs.existsSync(`${ADVANCEDPAGEASSETSPATH}/${selectedWidget}/widget/packageinfo.json`)) {
    packageinfo = JSON.parse(fs.readFileSync(`${ADVANCEDPAGEASSETSPATH}/${selectedWidget}/widget/packageinfo.json`, 'utf8'))
    widgetName = packageinfo.widgetApi[0].name
    zipper.sync.zip(`${ADVANCEDPAGEASSETSPATH}/${selectedWidget}/widget`).compress().save(`${tempPath}/${widgetName}.zip`)
  } else if (fs.existsSync(`${ADVANCEDPAGEASSETSPATH}/${selectedWidget}/src/widget/packageinfo.json`)) {
    packageinfo = JSON.parse(fs.readFileSync(`${ADVANCEDPAGEASSETSPATH}/${selectedWidget}/src/widget/packageinfo.json`, 'utf8'))
    widgetName = packageinfo.widgetApi[0].name
    process.chdir(`${ADVANCEDPAGEASSETSPATH}/${selectedWidget}`)
    await execa('yarn run build', [], {
      stdio: 'inherit'
    })
    process.chdir(ROOTPATH)
    zipper.sync.zip(`${ADVANCEDPAGEASSETSPATH}/${selectedWidget}/dist/widget`).compress().save(`${tempPath}/${widgetName}.zip`)
  }
  await apiUtils.setToken()
  let {
    tenantName
  } = await apiUtils.getCurrentuser()
  let {
    widgetLibraryMap
  } = await apiUtils.getWidgetNameList()
  let specialCharExp = /[\-\[\]\/\{\}\(\)\ \.\_\*\+\?\#\@\!\~\^\$\%\&\|\s\\]/g
  let libIdPrefix = 'bingo' + tenantName.toLowerCase().replace(specialCharExp, '') + '_'
  const widgetLibraryId = libIdPrefix + widgetName.replace(/_/g, '')
  const currentWidgetInGallery = widgetLibraryMap[widgetLibraryId]
  await apiUtils.publishWidget({
    zip: `${tempPath}/${widgetName}.zip`,
    zipName: `${widgetName}.zip`,
    name: widgetName,
    libraryId: widgetLibraryId,
    pluginId: currentWidgetInGallery ? currentWidgetInGallery.pluginId : ''
  })
  rimraf.sync(`${tempPath}`)
  process.exit()
}

module.exports = (...args) => {
  return publishWidget(...args).catch(err => {
    logUtils.error('magno_assets_starter failed to publish package', err)
  })
}
