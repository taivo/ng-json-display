var gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify');

// Scripts
gulp.task('build', function() {
  return gulp.src('src/*.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Build task complete' }));
});

// Default task
gulp.task('default', [], function() {
    gulp.run('build');
});
