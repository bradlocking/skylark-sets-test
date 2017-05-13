// Gulp
var gulp            = require('gulp');

// General plugins
var connect         = require('gulp-connect'),
    notify          = require('gulp-notify');

// JS Related Plugins
var eslint          = require('gulp-eslint');

// CSS Related Plugins
var sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps');


var appLocation  = './app/'


gulp.task('sass', function() {
    return gulp.src(appLocation + 'styles/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .on('error', sass.logError)
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appLocation + 'styles/css/'))
        .pipe(notify({ message: 'SASS Compiled.' }))
});



function lint(files) {
	return function() {
		return gulp.src(files)
			// eslint() attaches the lint output to the "eslint" property
			// of the file object so it can be used by other modules.
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format())
			// To have the process exit with an error code (1) on
			// lint error, return the stream and pipe to failAfterError last.
			.pipe(eslint.failAfterError());
	};
}

gulp.task('lint', lint(['./app/**/*.js','!./app/bower_components/**']));




// Fire up a localhost server for our app to view in the browser.
gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8889,
    livereload: true
  });
});




// We only need the HTML files for our app to reload in the browser
// So here we are telling livereload to do just that.
gulp.task('reload', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});




// Looks at our files in the app directory, and reloads when changes are made.
gulp.task('watch', function () {
  gulp.watch([
	'./app/**/*.html',
	'./app/**/*.js',
  './app/styles/sass/**/*.scss',
	'./app/images/**/*',
	'./app/data/**/*'
  ], ['reload', 'lint', 'sass']);
});




// default task
gulp.task('default', ['connect', 'watch']);