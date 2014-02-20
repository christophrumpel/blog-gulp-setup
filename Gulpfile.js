// Get modules
var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var uglify 		= require('gulp-uglify');
var rename 		= require("gulp-rename");
var imagemin 	= require('gulp-imagemin');
var livereload 	= require('gulp-livereload');

// Task sass
gulp.task('styles', function () {
    gulp.src('sass/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

// Task scripts
gulp.task('scripts', function() {
 	gulp.src('js/main.js')
    	.pipe(uglify())
    	.pipe(rename('main.min.js'))
    	.pipe(gulp.dest('js'))
      .pipe(livereload());
});

// Task images
gulp.task('images', function () {
    gulp.src('images-orig/*.{png,gif,jpg}')
        .pipe(imagemin())
        .pipe(gulp.dest('images/'));
});

// Task watch
gulp.task('watch', function () {

    var server = livereload();
    
  	gulp.watch('sass/**/*.scss', ['styles']);
  	gulp.watch('js/**.js', ['scripts']);
  	gulp.watch('images-orig/**', ['images']);
  	gulp.watch('../../app/views/**/*.php').on('change', function(file) {
      server.changed(file.path);
  });
    
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'scripts', 'images', 'watch']);