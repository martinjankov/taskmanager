var gulp = require('gulp');
var concat = require('gulp-concat');
 
gulp.task('concat-scripts', function() {
  return gulp.src('./build/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./src/js/'));
});