import gulp from 'gulp';
import clean from 'gulp-clean';

import less from 'gulp-less';
import minifyCss from 'gulp-minify-css';
import autoprefixer from 'gulp-autoprefixer';

import htmlmin from 'gulp-htmlmin';
import fileinclude from 'gulp-file-include';

import jshint from 'gulp-jshint';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import revCollector from 'gulp-rev-collector';


import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import connect from 'gulp-connect';
import open from 'open';


let Globel = {
	src:__dirname + '/src', // 源代码目录
	pro:__dirname + '/pro',  // 生产环境目录
	dev:__dirname + '/dev',  // 测试环境目录
	lib:__dirname + '/lib'   // 第三方依赖所在目录
}

gulp.task("default",function () {
	console.log("发布生产环境命令 => gulp pro\n测试环境测试命令 => gulp dev");
})


gulp.task("clean-dev",function() {
	console.log("-----清理dev目录完成-----");
	//因为我们不想要读取已经被删除的档案
	//我们可以加入read: false选项来防止gulp读取档案内容
	return gulp.src(Globel.dev,{ read:false })
		.pipe(clean({ force:true }))
	// force: true 即允许 del 控制本目录以外的文件
})
gulp.task("clean-pro",function () {
	console.log("-----清理pro目录完成-----");
	return gulp.src(Globel.pro,{ read:false })
		.pipe(clean({ force:true }))
})
gulp.task("clean",["clean-dev","clean-pro"])


/* 拷贝第三方的css */
gulp.task("copy:css",function () {
	gulp.src(Globel.src + '/css/*.css')
		.pipe(gulp.dest(Globel.dev + '/css'))
		.pipe(gulp.dest(Globel.pro + '/css'))
})
/* 拷贝图片 */
gulp.task("copy:images",function () {
	gulp.src(Globel.src + '/images/**/*')
		.pipe(gulp.dest(Globel.dev + '/images'))
		.pipe(gulp.dest(Globel.pro + '/images'))
})
// copy
gulp.task("copy",["copy:css","copy:images"],function () {
	console.log("-----copy资源完成-----");
})


// less处理
gulp.task("less",function () {
	gulp.src(Globel.src + '/css/*less')
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
		.pipe(gulp.dest(Globel.dev + '/css'))
		.pipe(connect.reload())
})
gulp.task("less:pro",function () {
	gulp.src(Globel.src + '/css/*.less')
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
		.pipe(rev())   // 生成时间戳
		.pipe(minifyCss())
		//.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(Globel.pro + '/css'))
		.pipe(rev.manifest())    // 生成json文件
		.pipe(gulp.dest(Globel.pro + '/rev/css'))	
})


// js处理
gulp.task("js",function () {
	gulp.src(Globel.src + '/js/*.js')
		// .pipe(jshint())
		// .pipe(jshint.reporter())
		.pipe(webpackStream(require('./webpack.config.js'),webpack)) //js打包
		.pipe(gulp.dest(Globel.dev + '/js'))
		.pipe(connect.reload())
})
gulp.task("js:pro",function () {
	gulp.src(Globel.src + '/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter())
		.pipe(webpackStream(require('./webpack.config.js'),webpack)) //js打包
		.pipe(rev())   // 生成时间戳
		.pipe(uglify())
		.pipe(gulp.dest(Globel.pro + '/js'))
		.pipe(rev.manifest())    // 生成json文件
		.pipe(gulp.dest(Globel.pro + '/rev/js'))
})


// template
gulp.task("fileinclude",function () {
	gulp.src(Globel.src + '/**/*.html')
		.pipe(fileinclude({
			prefix:'@@',
			basepath:'@file'
		}))
		.pipe(gulp.dest(Globel.dev))
		.pipe(connect.reload())
})
gulp.task("fileinclude:pro",function () {
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

	gulp.src(Globel.src + '/**/*.html')
		.pipe(fileinclude({
			prefix:'@@',
			basepath:'@file'
		}))
        .pipe(htmlmin(options))
		.pipe(gulp.dest(Globel.pro))
})


//rev
gulp.task("rev",function () {
	return gulp.src([Globel.pro + "/rev/**/*.json",Globel.pro + "/**/*.html"])
		.pipe(revCollector({
			replaceReved:true
		}))
		.pipe(gulp.dest(Globel.pro))
})


// 测试环境监听，监听src文件夹下的内容，实时刷新
gulp.task("watch",function () {
	connect.server({
		root:[Globel.dev],
		livereload:true,
		port:3000
	})

	open("http://localhost:3000")

	gulp.watch(Globel.src + '/css/**/*.less',["less"]);
	gulp.watch(Globel.src + '/js/**/*.js',["js"]);
	gulp.watch(Globel.src + '/**/*.html',["fileinclude"]);
	gulp.watch(Globel.src + '/images/*',["copy:images"]);
	//gulp.watch(__dirname + '/lib/**/*',["copy:lib"])
})

// 测试环境发布，访问dev下内容，源代码在src文件下
gulp.task("dev",["clean-dev"],function () {
	gulp.start('watch',["copy","less","js","fileinclude"]);
	console.log("-----已发布测试环境-----");
})

// 代码处理到生产环境,访问pro下内容，源代码在src文件下
gulp.task("pro",["clean-pro"],function () {
	gulp.start("copy","less:pro","js:pro","fileinclude:pro");
	setTimeout(function () {
		gulp.start("rev");
		console.log("-----已发布生产环境-----");
	},3000)
})