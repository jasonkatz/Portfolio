var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var extend = require('extend');
var fs = require('fs');
var rename = require('gulp-rename');
var minimist = require('minimist');
var clean = require('gulp-clean');

// List out our expected keys so
// we can do some error checking
var expectedKeys = [
    'base_js'
    , 'base_sass'
    , 'compiled_sass'
    , 'base'
    , 'entry_sass'
    , 'compiled_js'
    , 'exclude_js'
    , 'entry_js'
];

// Grab the inputs nicely so we can access
// as a simple object
// using 'string' to ensure that we are expecting
// values; they are not just flags
var OPTS = minimist(process.argv.slice(2),  {
    string: expectedKeys
});

// Do some quick error checking / log warnings
for (var i = 0; i < expectedKeys.length; ++i) {
    var key = expectedKeys[i];
    if (!OPTS[key]) console.log('Missing key: ' + key + ' in OPTS. Commands may not perform as expected');
}

// Setup a couple of constants
var JS_CONFIG = {
    JS_BASE: [OPTS.base, OPTS.base_js].join('/')
    , JS_LIBS: 'libs.js'
    , JS_FILES: JSON.parse(OPTS.entry_js || '{}')
    , JS_DEST: [OPTS.base, OPTS.compiled_js].join('/')
}

// This should just be a json
var SASS_CONFIG = {
    SASS_ROOT: [OPTS.base, OPTS.base_sass].join('/')
    , SASS_DEST: [OPTS.base, OPTS.compiled_sass].join('/')
    , SASS_FILES: JSON.parse(OPTS.entry_sass || '[]')
}

// Because we are using a 'watch' command, we don't want to
// include every single package, or else the watch get slow
// in this list, include dependencies we need for our project,
// but want to compile in a separate file that doesn't get watched
var excludes = JSON.parse(OPTS.exclude_js || '[]');

// This gets loaded when we want to compile our sass
// By default, output files will have the same name
// as the inputs (but with *.css instead of *.scss)
function compileSass(src, nodeSassParams, opts) {
    src = [SASS_CONFIG.SASS_ROOT, src].join('/');

    // Only compile if the css exists
    if (!fs.existsSync(src)) {
        console.error('Cannot compile. ' + src + ' does not exist');
        return;
    }

    opts = opts || {};

    var compiler = gulp.src(src);

    // Init sourcemaps only if desired
    // We don't want them on prod because they are bulky
    if (opts.sourcemap) compiler = compiler.pipe(sourcemaps.init());

    compiler = compiler.pipe(
        sass(
            extend(
                { errLogToConsole: true }
                , nodeSassParams
            )
        )
    )
    .on('error', console.log.bind(console));

    if (opts.sourcemap) compiler = compiler.pipe(sourcemaps.write());
    if (opts.rename) compiler = compiler.pipe(rename({ basename: opts.rename }));

    compiler.pipe(gulp.dest(SASS_CONFIG.SASS_DEST));

    console.log('Compiled ' + src + ' : to ' + SASS_CONFIG.SASS_DEST + ' '+ new Date());
}

function performJSCheck(entry) {
    // Only compile is the js exists
    if (!fs.existsSync(entry)) {
        console.error('Cannot compile. ' + entry + ' does not exist');
        return false;
    }
    if (fs.lstatSync(entry).isDirectory()) {
        console.error('Cannot compile. ' + entry + ' expected file, but received directory.');
        return false;
    }

    if (!JS_CONFIG.JS_FILES.JS_OUT) {
        JS_CONFIG.JS_FILES.JS_OUT = 'bundle.js';
        console.log('No out name specified. Defaulting to \'bundle.js\'');
    }

    return true;
}

function performSASSCheck() {
    // Only generate sass, if we have sass files

    // If no base sass was defined, then we need to stop watcing
    if (!OPTS.base_sass) {
        console.error('No base_sass directory detected -- not generating sass');
        return false;
    }

    return true;
}

// This is the task that will build the excluded dependencies
// It builds out MINIFIED source code, and without the source map
gulp.task('js-deps', function() {
    if (!excludes.length) return;

    console.log('Building dependencies');
    browserify({
        // debug: true
        cache: {}, packageCache: {}, fullPaths: true, basedir: JS_CONFIG.JS_BASE
    })
    .on('file', function(file, id, parent) {
        console.log('Compiling the following libraries: ', id);
    })
    .require(excludes)
    .bundle()
    .pipe(source(JS_CONFIG.JS_LIBS))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(JS_CONFIG.JS_DEST));
});

// This task will do the watching.
// Any time it detects that a file has changed,
// it will recompile our javascript source
// We are using the 'poll' flag as a slight hack,
// because we have had issues where saving one file multiple times sometimes doesn't cause the source to get updated
// This is not minified, because this is what developers will be using
// and it will be easy to debug
gulp.task('watch-js', function() {

    var entry = [JS_CONFIG.JS_BASE, JS_CONFIG.JS_FILES.JS_IN].join('/');

    if (!performJSCheck(entry)) return;

    var watcher = watchify(
        browserify({
            entries: [entry]
            , transform: [reactify]
            , debug: true
            , cache: {}, packageCache: {}, fullPaths: true
        })
        .external(excludes)
        .on('file', function(file, id) {
            console.log('Finished watching:', id);
        })
        , { poll: 500 }
    );

    console.log('Updated ' + JS_CONFIG.JS_FILES.JS_OUT + ' ' + new Date());

    return watcher.on('update', function() {
        watcher.bundle()
            .on('error', function(err) {
                // Don't flood the console
                delete err.stream;

                console.log('Syntax error found:', err);
            })
            .pipe(source(JS_CONFIG.JS_FILES.JS_OUT))
            .pipe(gulp.dest(JS_CONFIG.JS_DEST));

        console.log('Updated ' + JS_CONFIG.JS_FILES.JS_OUT + ' ' + new Date());
    })
    .bundle()
    .pipe(source(JS_CONFIG.JS_FILES.JS_OUT))
    .pipe(gulp.dest(JS_CONFIG.JS_DEST));
});

// This is the task that gets run on dev
// It basically does a 'watch' one time, but compiles everything
// without the source map and minifies it
gulp.task('minify-js', function() {
    var entry = [JS_CONFIG.JS_BASE, JS_CONFIG.JS_FILES.JS_IN].join('/');

    if (!performJSCheck(entry)) return;

    var bundler = browserify({
        entries: [entry]
        , transform: [reactify]
        // , debug: true
        , cache: {}, packageCache: {}, fullPaths: true
    }).external(excludes);

    bundler
        .bundle()
        .pipe(source(JS_CONFIG.JS_FILES.JS_OUT))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(JS_CONFIG.JS_DEST));
});

// Compile our sass with gulp
gulp.task('dev-css', function() {
    var sassList = SASS_CONFIG.SASS_FILES;

    for (var i = 0; i < sassList.length; ++i) {
        var sassObj = sassList[i];

        compileSass(
            sassObj.SASS_IN
            , {
                outputStyle: 'expanded'
            }
            , {
                sourcemap: true
                , rename: sassObj.SASS_OUT
            }
        );
    }
});

// Command to minify all of our css
gulp.task('minify-sass', function() {
    if (!performSASSCheck()) return;

    var sassList = SASS_CONFIG.SASS_FILES;

    for (var i = 0; i < sassList.length; ++i) {
        var sassObj = sassList[i];

        compileSass(
            sassObj.SASS_IN
            , {
                outputStyle: 'compact'
            }
            , {
                rename: sassObj.SASS_OUT
            }
        );
    }
});

// Whenever files in this directory change, compile our main scss
// Also, compile the css first, and then start watching, so
// devs don't have to resave the file
gulp.task('watch-sass', ['dev-css'], function() {
    // Select the directory that we should 'watch' for file changes
    var sassDir = [SASS_CONFIG.SASS_ROOT, '**', '*.scss'].join('/');

    if (!performSASSCheck()) return;

    console.log('Watching directory for sass changes: ' + sassDir);

    // When things in that dir change, compile our css
    gulp.watch(sassDir, ['dev-css']);
});

// This is what we should run on developer checkouts
gulp.task('watch', function() {
    gulp.start(['watch-js', 'watch-sass']);
});

// This is what should get run on dev and prod
gulp.task('build', ['clean'], function() {
    gulp.start(['js-deps', 'minify-js', 'minify-sass']);
});

// We need to remove the css build dir when compiling
// otherwise we get permission errors
gulp.task('clean', function() {
    var stream;

    if (OPTS.compiles_sass && fs.existsSync(SASS_CONFIG.SASS_DEST)) {
        stream = gulp.src(SASS_CONFIG.SASS_DEST, { read: false })
            .pipe(clean({ force: true }));

        console.log('Removed directory: ' + SASS_CONFIG.SASS_DEST);
    }

    return stream;
});

// If you just run ./node_modules/gulp/bin/gulp.js it will default to the watch command
gulp.task('default', ['watch']);
