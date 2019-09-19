const gulp = require('gulp')
const path = require('path')

const distPath = path.resolve(process.env.PACKAGECWD, './dist/**')
const appDistPath = path.resolve(process.env.PACKAGECWD, '../../dist/theme-chalk')

gulp.task('default', () =>
  gulp.src(distPath)
    .pipe(gulp.dest(appDistPath))
)
