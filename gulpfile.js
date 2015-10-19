var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var minifyHTML   = require('gulp-minify-html');
var imagemin     = require('gulp-imagemin');

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

gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}))
});

gulp.task('copy-res', ['copy-img'], function() {
   return gulp.src(['res/**/*', 'font/**/*'], { base: '.' })
        .pipe(gulp.dest('./dist/'))
});

gulp.task('copy-img', function() {
    return gulp.src(['img/**/*'], { base: '.' })
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', ['js', 'css', 'html', 'copy-res'], function() {
    browserSync({
        server: {baseDir: 'dist'}
    });

    gulp.watch(['./css/*.css'],  ['css'],   reload);
    gulp.watch([['./js/*.js']],  ['js'],    reload);
    gulp.watch([['index.html']], ['html'],  reload);
});


gulp.task('default', ['watch']);
gulp.task('build',   ['js', 'css', 'html', 'copy-res']);