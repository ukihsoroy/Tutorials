const gulp = require('gulp')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const zip = require('gulp-zip')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const log = console.log

const widgetName = process.env.WIDGETNAME
const sfcContent = fs.existsSync(process.env.PACKAGECWD + '/dist/index.js') ? fs.readFileSync(process.env.PACKAGECWD + '/dist/index.js', 'utf8') : ''
const jsonContent = fs.readFileSync(process.env.PACKAGECWD + `/src/${widgetName}.json`, 'utf8')
const editorjscontent = fs.readFileSync(process.env.PACKAGECWD + `/src/widget/${widgetName}.editor.js`, 'utf8')
const beforecontent = editorjscontent.substr(0, editorjscontent.search(/propertiesConfig(\s)*/))
const propertiesConfigcontent = `propertiesConfig: [
  ${jsonContent}
],
`
const aftercontent = editorjscontent.substr(editorjscontent.search(/create(\s)*:(\s)*function/))
const neweditorjscontent = beforecontent + propertiesConfigcontent + aftercontent

gulp.task('copyWidgetFiles', () => {
  return gulp.src([process.env.PACKAGECWD + '/src/widget/**', process.env.PACKAGECWD + `/src/${widgetName}.vue`, process.env.PACKAGECWD + `/src/${widgetName}.json`])
    .pipe(gulp.dest(process.env.PACKAGECWD + '/dist/widget/'))
})

gulp.task('jsonToWidgetEditor', (cb) => {
  fs.writeFileSync(process.env.PACKAGECWD + `/dist/widget/${widgetName}.editor.js`, neweditorjscontent)
  cb()
})

gulp.task('sfcToWidget', () => {
  return gulp.src([process.env.PACKAGECWD + `/src/widget/${widgetName}.js`])
    .pipe(replace(/!function\(e,t\)(.|\n)*\);/, sfcContent))
    .pipe(gulp.dest(process.env.PACKAGECWD + '/dist/widget/'))
})

gulp.task('cssToWidget', () => {
  return gulp.src(process.env.PACKAGECWD + '/dist/index.css', { allowEmpty: true })
    .pipe(rename(`${widgetName}.css`))
    .pipe(gulp.dest(process.env.PACKAGECWD + `/dist/widget/`))
})

gulp.task('zipWidget', () => {
  return gulp.src(process.env.PACKAGECWD + '/dist/widget/*')
    .pipe(zip(`${widgetName}.zip`))
    .pipe(gulp.dest(process.env.PACKAGECWD + '/dist'))
    .pipe(gulp.dest(path.resolve(process.env.PACKAGECWD, '..', '..', '..', 'dist', 'advancedPageAssets')))
    .on('end', function () { log(chalk.yellow(`The ${widgetName}.zip has been put in the widget directory`)) })
})

gulp.task('default', gulp.series(['copyWidgetFiles', 'jsonToWidgetEditor', 'sfcToWidget', 'cssToWidget', 'zipWidget']))
