var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var path = {
    BUNDLED_JS: 'bundle.js'
    , MAIN_JS: './main.js'
    , DESTINATION_JS: 'build'
    , LIBS_OUT_JS: 'libs.js'
}

var excludes = [
];

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
    .pipe(source(path.LIBS_OUT_JS))
    .pipe(gulp.dest(path.DESTINATION_JS));
});

gulp.task('watch-js', function() {
    var watcher = watchify(browserify({
        entries: [path.MAIN_JS]
        , debug: true
        , cache: {}, packageCache: {}, fullPaths: true
    })
    .external(excludes)
    .on('file', function(file, id) {
        console.log('Finished watching:' , id);
    })
    , {poll: 500});

    return watcher.on('update', function() {
        watcher.bundle()
            .on('error', function(err) {
                delete err.stream; // Don't output everything
                console.log("Syntax error found:", err);
            })
            .pipe(source(path.BUNDLED_JS))
            .pipe(gulp.dest(path.DESTINATION_JS));
    })
    .bundle()
    .pipe(source(path.BUNDLED_JS))
    .pipe(gulp.dest(path.DESTINATION_JS));
});

gulp.task('bundle', function() {
    var bundler = browserify({
        entries: [path.MAIN_JS]
        , debug: true
        , cache: {}, packageCache: {}, fullPaths: true
    });

    bundler
        .bundle()
        .pipe(source(path.BUNDLED_JS))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(path.DESTINATION_JS));
});

gulp.task('sass', function() {
    gulp.src('../scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded', errLogToConsole: true })).on('error', console.log.bind(console))
        .pipe(gulp.dest('../styles/build'));
    console.log('Compiled sass ' + new Date());
});

gulp.task('watch-sass', function() {
    gulp.watch('../scss/**/*.scss', ['sass']);
});

gulp.task('watch', function() {
    gulp.start(['watch-js', 'watch-sass']);
});

gulp.task('default', ['watch']);
