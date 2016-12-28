var gulp = require('gulp');
/*var swiper = require('swiper');
var swiperAnimate = require('swiper-animate');
var zepto = require('zepto');*/
var sass = require('gulp-ruby-sass');
//var concat = require('gulp-concat');

//copy
gulp.task('watchJs',function(){
	//gulp.src('sass/*.*').pipe(gulp.dest('css'));
	gulp.watch('dest/*.js',function(){
		gulp.src('dest/*.js').pipe(gulp.dest('js'));
	})
});

//sass 监听 css

gulp.task('watchCss',function(){
	gulp.watch("sass/*.*",function(){
		sass("sass/*.scss").on('error',sass.logError).pipe(gulp.dest('css'));
	});
});