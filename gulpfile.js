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

var appLocation  = './app/';

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






/*

EXPRESS SERVER CONFIG

*/


// Import the necessary packages to run express
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    httpProxy = require('http-proxy'),
    livereload = require('connect-livereload');

    // Port for Livereload, Server Port and Skylark API root.
    var livereloadport = 35729,
        serverport = 8080,
        apiForwardingUrl = 'http://feature-code-test.skylark-cms.qa.aws.ostmodern.co.uk:8000';

    // Set up an express server (but not starting it yet)
    var server = express();

    // Define the port that Express will listen on
    server.set('port', serverport);

    // Serve static directory where our angular app is located.
    server.use(express.static(__dirname + '/app'));
 
    // Add live reload to express
    server.use(livereload({port: livereloadport}));

    // Create proxy server 
    var apiProxy = httpProxy.createProxyServer();

    // Grab all requests to the server that include the slug "/api/".
    server.all("/api/*", function(req, res) {
        // Forward all /api/ requests from the skylark API to express.
        apiProxy.web(req, res, {target: apiForwardingUrl});
    });

    // Redirect all non resolving traffic to the project root index.html.
    // Fixes issue where refresh would reuturn a cannot GET /[page] error.
    server.get('/*', function(req, res){
      res.sendFile(__dirname + '/app/index.html');
    });


// Dev task
gulp.task('dev', ['watch'], function() {
    // Start webserver and listen on defined port.
    server.listen(server.get('port'), function() {
        console.log('Express server listening on port ' + server.get('port'));
    });

    // Start live reload and
    lrserver.listen(livereloadport);
});


// We only need the HTML files for our app to reload in the browser
// So here we are telling livereload to do just that.
gulp.task('reload', function () {
    gulp.src('./app/**/*.html')
        .pipe(server.reload());
});


// Looks at our files in the app directory, and reloads when changes are made.
gulp.task('watch', function () {
    gulp.watch([
        './app/**/*.html',
        './app/**/*.js',
        './app/styles/sass/**/*.scss',
        './app/images/**/*',
        './app/data/**/*'
    ], ['lint', 'sass']);
});