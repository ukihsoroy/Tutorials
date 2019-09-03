const path = require('path')

module.exports = {
  PACKAGETYPE: {
    'COMPONENT': 1,
    'WIDGET': 2,
    'WIDGETCOMPONENT': 3
  },
  APPTEMPLATEPATH: path.resolve(__dirname, '../../templates/app-template'),
  COMPONENTTEMPLATEPATH: path.resolve(__dirname, '../../templates/magno-component-template'),
  WIDGETCOMPONENTTEMPLATEPATH: path.resolve(__dirname, '../../templates/magno-vue-widget-template'),
  WIDGETTEMPLATEPATH: path.resolve(__dirname, '../../templates/magno-widget-template'),
  ROOTPATH: process.env.CURR_DIR,
  DISTPATH: `${process.env.CURR_DIR}/dist`,
  STANDARDPAGEASSETSPATH: `${process.env.CURR_DIR}/packages/standardPageAssets`,
  ADVANCEDPAGEASSETSPATH: `${process.env.CURR_DIR}/packages/advancedPageAssets`,
  POIDEVFILE: 'poi.dev.js',
  POIBUILDFILE: 'poi.build.js'
}
