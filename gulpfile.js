var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');

gulp.task('browser-sync', ['html-refresh', 'keg-html-refresh', 'glass-html-refresh', 'test-glass-html-refresh', 'sass', 'buildFrontEnd-js'], function() {
  browserSync({
    server: {
      baseDir: './FOH/'
    }
  });
});

gulp.task('html-refresh', function() {
  return gulp.src('./FOH/index.html')
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('keg-html-refresh', function() {
  return gulp.src('./FOH/keg.html')
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('glass-html-refresh', function () {
  return gulp.src('.FOH/glass.html')
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('test-glass-html-refresh', function() {
  return gulp.src('./FOH/testglass.html')
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function() {
  return gulp.src('FOH/styles/main.scss')
  .pipe(sass({
    includePaths: ['css'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade : true}))
  .pipe(browserSync.reload({stream : true}))
  .pipe(gulp.dest('./FOH/styles'));
});

//Add in once I start programming javascript on the frontend
gulp.task('buildFrontEnd-js', function() {
  return gulp.src('./FOH/scripts/functions.js')
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
  gulp.watch('./FOH/index.html', ['html-refresh']);
  gulp.watch('./FOH/keg.html' , ['keg-html-refresh']);
  gulp.watch('./FOH/glass.html', ['glass-html-refresh']);
  gulp.watch('./FOH/testglass.html', ['test-glass-html-refresh']);
  gulp.watch('./FOH/styles/**', ['sass']);
  gulp.watch('./FOH/scripts/**', ['buildFrontEnd-js']);
});

gulp.task('default', ['browser-sync', 'watch']);
