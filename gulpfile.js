var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var less = require('gulp-less');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');

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

gulp.task('less', function () {
  return gulp.src(paths.styles.src)
  .pipe(less())
  .pipe(gulp.dest(paths.styles.dest));
});


gulp.task('build', function () {
  browserify({
    entries: 'src/client/scripts/index.js',
    extensions: ['.js'],
    paths: ['src/client/scripts']
  })
  .transform(babelify.configure({
  stage: 0
  }))
  .bundle()
  .on('error', function (err) {
      console.log(err.toString());
      this.emit("end");
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts.src, ['build']);
  gulp.watch(paths.styles.src, ['less']);
});
