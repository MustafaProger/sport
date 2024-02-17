const cleanCSS     = require('gulp-clean-css');
const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass')(require('sass'));
const rename       = require("gulp-rename");
const autoprefixer = require('autoprefixer');
const postcss      = require('gulp-postcss');
const htmlmin      = require('gulp-htmlmin');
const imagemin     = require('gulp-imagemin');


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('compilation', function () {
    return gulp.src("src/sass/*.+(scss|sass|css)")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});


gulp.task('html', function(){
    return gulp.src('src/*.html') 
    .pipe(htmlmin({ collapseWhitespace: true })) 
    .pipe(gulp.dest('dist/'));
});

gulp.task('styles', function(){
    return gulp.src('src/css/*.css') 
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
    return gulp.src('src/js/*.js') 
    .pipe(gulp.dest('dist/js'));
});

gulp.task('icons', function(){
    return gulp.src('src/icons/**/*') 
    .pipe(gulp.dest('dist/icons'));
})

gulp.task('img', function(){
    return gulp.src('src/img/**/*') 
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
})

gulp.task('php', function(){
    return gulp.src('src/php/**/*') 
    .pipe(gulp.dest('dist/php'));
})

gulp.task('watch', function(){
    gulp.watch('src/*.html').on('change', browserSync.reload)
    gulp.watch('src/sass/*.+(scss|sass|css)', gulp.parallel('compilation'))
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('compilation'))
    gulp.watch('src/js/*.js', gulp.parallel('scripts'))
    gulp.watch('src/*.html', gulp.parallel('html'))
    gulp.watch('src/img/**/*', gulp.parallel('img'))
    gulp.watch('src/icons/**/*', gulp.parallel('icons'))
});

gulp.task('default', gulp.parallel('watch', 'server', 'compilation', 'html', 'styles', 'scripts', 'icons', 'img', 'php'));