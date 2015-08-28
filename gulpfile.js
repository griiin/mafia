var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var less = require('gulp-less');

var paths = {
  src: ['src/server/**/*js', 'app.js'],
  scripts: {
    src: ['src/client/scripts/**/*.js'],
    dest: 'public/scripts/'
  },
  styles: {
    src: ['src/client/styles/**/*.less'],
    dest: 'public/styles/'
  }
};

gulp.task('babel', function () {
  return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('less', function () {
  return gulp.src(paths.styles.src)
  .pipe(less())
  .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts.src, ['babel']);
  gulp.watch(paths.styles.src, ['less']);
});
