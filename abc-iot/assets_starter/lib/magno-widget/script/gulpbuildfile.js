const gulp = require('gulp')
const zip = require('gulp-zip')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const logUtils = require('../../util/logUtils')

let PACKAGEINFOPATH = process.env.PACKAGECWD + '/widget/packageinfo.json'
let WIDGETFILES = process.env.PACKAGECWD + '/widget/**'
let DISTPATH = process.env.PACKAGECWD + '/dist'
let APPDISTPATH = path.resolve(process.env.PACKAGECWD, '../../../dist/advancedPageAssets')

if (fs.existsSync(PACKAGEINFOPATH)) {
  let packageinfo = fs.readFileSync(PACKAGEINFOPATH, 'utf8')
  let widgetName = JSON.parse(packageinfo).widgetApi[0].name
  gulp.task('default', () =>
    gulp.src(WIDGETFILES)
      .pipe(zip(`${widgetName}.zip`))
      .pipe(gulp.dest(DISTPATH))
      .pipe(gulp.dest(APPDISTPATH))
      .on('end', function () {
        logUtils.info(`The ${widgetName}.zip has been put in the widget directory`)
      })
  )
} else {
  logUtils.info('The file of packageinfo.json does not exist in the widget directory')
}
