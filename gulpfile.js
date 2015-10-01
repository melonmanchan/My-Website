var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var minimist = require('minimist');
var gulpif   = require('gulp-if');

var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'development'}
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('js', function() {
    return gulp.src(['./js/*.js'])
        .pipe(concat('dist.js'))
        .pipe(gulpif(options.env !== 'development', uglify({mangle: true})))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}));
});

gulp.task('css', function() {
    return gulp.src(['./css/*.css'])
        .pipe(autoprefixer())
        .pipe(gulpif(options.env !== 'development', minifyCSS()))
        .pipe(concat('dist.css'))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}));
});

gulp.task('watch', ['js', 'css'], function() {
    browserSync({
        server: {baseDir: '.'}
    });

    gulp.watch(['./css/*.css'], ['css'],    reload);
    gulp.watch([['./js/*.js']], ['js'],     reload);
    gulp.watch(['index.html']).on('change', reload);
});


gulp.task('default', ['watch']);
gulp.task('build',   ['js', 'css']);