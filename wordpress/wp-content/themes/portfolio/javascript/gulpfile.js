var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');

var path = {
    BUNDLED: 'bundle.js'
    , MAIN: './main.js'
    , DESTINATION: 'build'
    , LIBS_OUT: 'libs.js'
}

var excludes = [];

gulp.task('dependencies', function() {
    browserify({
        debug: true
        , cache: {}, packageCache: {}, fullPaths: true
    })
    .require(excludes)
    .on('prebundle', function(bundle) {
        console.log(bundle);
    })
    .bundle()
    .pipe(source(path.LIBS_OUT))
    .pipe(gulp.dest(path.DESTINATION));
});

gulp.task('watch', function() {
    var watcher = watchify(browserify({
        entries: [path.MAIN]
        , debug: true
        , cache: {}, packageCache: {}, fullPaths: true
    }).external(excludes), {poll: 500});

    return watcher.on('update', function() {
        watcher.bundle()
            .on('error', function(err) {
                delete err.stream; // Don't output everything
                console.log("Syntax error found:", err);
            })
            .pipe(source(path.BUNDLED))
            .pipe(gulp.dest(path.DESTINATION));
        console.log('Updated ' + path.MAIN + ' ' + new Date());
    })
        .bundle()
        .pipe(source(path.BUNDLED))
        .pipe(gulp.dest(path.DESTINATION));
});

gulp.task('bundle', function() {
    var bundler = browserify({
        entries: [path.MAIN]
        , debug: true
        , cache: {}, packageCache: {}, fullPaths: true
    });

    bundler
        .bundle()
        .pipe(source(path.BUNDLED))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(path.DESTINATION));
});

gulp.task('default', ['watch']);
