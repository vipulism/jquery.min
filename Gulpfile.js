var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass'),
	combineMq = require('gulp-combine-mq'),
	imagemin = require('gulp-imagemin');
	watch = require('gulp-watch');

	// zip = require('gulp-zip');
	// npm install gulp-uglify gulp-ruby-sass gulp-ruby-sass gulp-combine-mq gulp-imagemin gulp-watch



//scripts task 
gulp.task('img', function () {
    return gulp.src('lib/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
           // use: [pngquant()]
        }))
        .pipe(gulp.dest('images'));
});

gulp.task('scripts', function () {	
	gulp.src('lib/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('js/glob.min.js'));
});

//styles
gulp.task('style', function () {
	
	 return sass('lib/scss/', ({style: 'compressed'}))
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(combineMq({ beautify: false }))
	.pipe(gulp.dest('css/'));
});

gulp.task('new', function () {
	
	gulp.watch('lib/scss/*.scss', ['style']);
	gulp.watch('bower_components/bootstrap-sass/assets/**/*.scss', ['style']);
   
});



gulp.task('zip', function () {	
		return gulp.src('js/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('minjs'));

});

gulp.task('default', ['scripts', 'style']);