var gulp = require('gulp');
var livereload = require('gulp-livereload'), // 网页自动刷新（文件变动后即时刷新页面）
	webserver = require('gulp-webserver'), // 本地服务器
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	babel = require('gulp-babel'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	cssnano = require('cssnano'),
	autofixer = require('autoprefixer'),
	imagemin = require('gulp-imagemin'),
	tiny = require('gulp-tinypng-nokey'),
	tinyPng = require('imagemin-pngquant'),
	clean = require('gulp-clean'),
	changed = require('gulp-changed'),
	sourcemaps = require('gulp-sourcemaps'),
	htmlmin = require('gulp-htmlmin'),
	gulpCopy = require('gulp-copy'),
	minifyCSS = require('gulp-clean-css'),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create(),
	rev = require('gulp-rev'), // 缓存控制
	spritesmith = require('gulp.spritesmith'),
	revCollector = require('gulp-rev-collector'), // 缓存控制
	requirejsOptimize = require('requirejs');

var path = require('path'),
	desDir = require('./localconfig.json').templateaddress; // 读取模板的路径，因为每个人的路径都不一致，所以放到localconfig文件中并且添加到gitignore中

/**************************开发配置*****************************/
// clean build folder.
gulp.task('cleanbuild', function (cb) {
	var stream = gulp.src('./build/', {
		read: false
	}).pipe(clean());

	console.log('build目录删除成功！');
	return stream;
});

// images 压缩处理.
gulp.task('imgtiny', function (cb) {
	var stream = gulp.src(['./src/static/pc/img/**/*.@(png|jpeg|gif|jpg)', '!./src/static/pc/img/befsprites/*'])
		// .pipe(tiny())
		.pipe(gulp.dest('./build/static/pc/img/'));

	console.log('图片压缩成功！');
	return stream;

});

// 单独处理base目录之外的scss文件
gulp.task('scsstocss', function () {
	var plugins = [
		autofixer({
			browsers: ["last 2 versions", "> 1%", "iOS >= 7", "Android >= 4.1", "not ie <= 8"]
		})
	];

	var stream = gulp.src('./src/static/pc/css/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./build/static/pc/css/'));

	console.log('自定义scss处理成功！');
	return stream;
});

// 源文件css copy到build目录
gulp.task('devcopycss', function () {
	var stream = gulp.src('./src/static/pc/css/**/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/static/pc/css/'));

	console.log('源文件css拷贝完成');
	return stream;
});

// 源文件js复制处理,并处理自定义es6文件
gulp.task('devcopyjsfile', function () {
	var stream = gulp.src(['./src/static/pc/js/**/*.js', '!./src/static/pc/js/3rdlibs/**/*.js', '!./src/static/pc/js/rjs/**'])
		.pipe(babel())
		.pipe(gulp.dest('./build/static/pc/js/'))
	return stream;
});

// 将前端开发时，使用到的js赋值html模板代码合并到jquery中
gulp.task('devcopyjsassignhtmlfile', ['devcopyjsfile'], function () {
	var stream = gulp.src(['./src/static/pc/js/3rdlibs/jquery.js', './src/static/pc/js/pages/dev.js'])
		.pipe(concat('jquery.js'))
		.pipe(gulp.dest('./build/static/pc/js/3rdlibs/'));
	console.log('copy devjs success');
	return stream;
});

// 源第三方源文件(不进行es6处理)
gulp.task('devcopy3rdjsfile', function () {
	var stream = gulp.src('./src/static/pc/js/3rdlibs/**/*.js')
		.pipe(gulp.dest('./build/static/pc/js/3rdlibs/'));

	console.log('源文件js拷贝完成');
	return stream;
});
// 源文件fonts复制处理处理
gulp.task('devcopyfonts', function () {
	var stream = gulp.src('./src/static/pc/fonts/**/*')
		.pipe(gulp.dest('./build/static/pc/fonts/'));

	console.log('源文件fonts拷贝完成');
	return stream;
});
// 源文件html copy到build目录
gulp.task('devcopyhtml', function () {
	var stream = gulp.src(path.resolve(desDir, './templates/pc/**/*.html'))
		.pipe(gulp.dest('./build/templates/pc/'));

	console.log('源文件html拷贝完成');
	return stream;
});
// 开发环境启动服务
gulp.task('webserver', function () {
	gulp.src('./build/')
		.pipe(webserver({
			host: 'localhost',
			port: 8081,
			livereload: true, // 启用LiveReload
			open: true, // 服务器启动时自动打开网页
			proxies: [{
				source: '/api',
				// target: 'http://112.74.172.222:8080/',
				// target: 'http://10.8.37.249:8080'
				target: 'http://10.0.158.28:8080'
			}, {
				source: '/pc',
				target: 'http://localhost:8081/static/pc/'
			}]
		}))
});
// 监听有关文件改动
gulp.task('watch', function () {
	gulp.watch(path.resolve(desDir, './templates/pc/**/*.html'), ['devcopyhtml']).on('change', browserSync.reload);
	gulp.watch('./src/static/pc/js/**/*.js', ['devcopyjsfile']).on('change', browserSync.reload);
	gulp.watch('./src/static/pc/css/**/*.scss', ['scsstocss']).on('change', browserSync.reload);
	gulp.watch('./src/static/pc/css/**/*.css', ['devcopycss']).on('change', browserSync.reload);
});

// 开发环境一键处理(如有特别需求，请具体任务执行)
gulp.task('dev', function (callback) {
	runSequence(['devcopyhtml', 'imgtiny', 'devcopyfonts', 'devcopycss', 'devcopyjsfile', 'devcopyjsassignhtmlfile', 'devcopy3rdjsfile', 'scsstocss'], 'webserver', 'watch', callback);

	console.log('开发环境启动成功！');
}).on('task_err', function (err) {
	console.log('开发环境启动失败：', err);
});

/**************************生产配置*****************************/
// 删除dist下重新复制
gulp.task('cleandist', function (cb) {
	var stream = gulp.src(path.resolve(desDir, './static/pc/'), {
			read: false
		})
		.pipe(clean({
			force: true
		}));
	console.log('dist文件夹删除成功！');
	return stream;
})
// css压缩md5处理
gulp.task('prodcssmd5', function () {
	var stream = gulp.src(['./build/static/pc/css/**/*.css'])
		.pipe(minifyCSS({
			compatibility: 'ie8',
			keepSpecialComments: '*'
		}))
		//		.pipe(rev())
		.pipe(gulp.dest(path.resolve(desDir, './static/pc/css/')))
	//		.pipe(gulp.dest('./build/static/pc/css/rev/'));

	console.log('生产环境css md5处理完毕');
	return stream;
});

// 第三方js，图片字体文件处理
gulp.task('prod3thjscopy', function () {
	var stream = gulp.src(['./build/static/pc/**/*.min.js', './build/static/pc/**/+(fonts|img)/**/*'])
		.pipe(gulp.dest(path.resolve(desDir, './static/pc/')));

	console.log('第三方已压缩js、图片、字体等文件复制处理');
	return stream;
});
// js第三方未压缩插件压缩处理(*.min.js文件除外)
gulp.task('prod3thcomcopy', function (cp) {
	pump([
		gulp.src(['./src/static/pc/js/3rdlibs/**/*.js', '!./src/static/pc/js/3rdlibs/**/*.min.js']),
		gulp.dest('./build/static/pc/js/3rdlibs/'),
		gulp.src(['./build/static/pc/js/3rdlibs/**/*.js', '!./build/static/pc/js/3rdlibs/**/*.min.js']),
		uglify(),
		gulp.dest(path.resolve(desDir, './static/pc/js/3rdlibs/'))
	], cp);
})
// 拷贝压缩处理js, 不包括第三方及需要版本控制的js ***
gulp.task('prodjscopy', function (cp) {
	pump([
		gulp.src(['./build/static/pc/**/*.js', '!./build/static/pc/js/3rdlibs/**/*.js']),
		babel(),
		uglify({
			mangle: {
				reserved: ['require', 'exports', 'module', '$']
			},
			// compress: true			
			compress: false
		}),
		gulp.dest(path.resolve(desDir, './static/pc/'))
	], cp);
});

// 生产环境一键处理
gulp.task('prod', function (callback) {
	runSequence('prodjscopy', 'prod3thcomcopy', 'prod3thjscopy',
		'prodcssmd5');
});


// -----------------------生产流程调整----------------------------
// 清空本地rjs/dist
gulp.task('cleanrjsdist', function(cd) {
	var stream = gulp.src('./rjs/dist/', {
		read: false
	}).pipe(clean({
		force: true
	}));

	console.log('------****** 生产环境准备 rjs/dist目录成功删除！******------');
	return stream;
});
// 删除本地原rjs配置文件
gulp.task('cleanmsbuildjs', function(cd) {
	var stream = gulp.src('./rjs/msbuild.json', {
		read: false
	}).pipe(clean({
		force: true
	}));

	console.log('------****** 生产环境准备 msbuild.json成功删除！******------');
	return stream;
});
// 执行 node createBuild.js
gulp.task('createbuildjs', function(){
	require('./rjs/createBuild.js');

	console.log('------****** 生产环境准备 msbuild.json 已成功动态创建 ******------');
});
// 执行node r.js -o createBuild.js
gulp.task('rjs', function(cd) {
	// msbuild.js
	var msBuildJs = require('./rjs/msbuild.json');

	requirejsOptimize.optimize({
		appDir: msBuildJs.appDir,
		baseUrl: msBuildJs.baseUrl,
		dir: msBuildJs.dir,
		removeCombined: msBuildJs.removeCombined,
		fileExclusionRegExp: msBuildJs.fileExclusionRegExp,
		optimize: msBuildJs.optimize,
		modules: msBuildJs.modules,
		paths: msBuildJs.paths,
		shim: msBuildJs.shim
	}, function (buildResponse) {
		cd();
	}, cd);

	console.log('------****** 生产环境准备 js文件已合并 ******------');
});
// 图片文件处理
gulp.task('prodImgcopy', function () {
	var stream = gulp.src('./build/static/pc/**/+(img)/**/*')
		.pipe(gulp.dest(path.resolve(desDir, './static/pc/')));

	console.log('------****** 生产环境准备 图片文件拷贝完成 ******------');
	return stream;
});
// 拷贝js文件
gulp.task('prodjs', function(cb) {
	var stream = gulp.src(['./rjs/dist/pages/**/*', './rjs/ieBetter.js', './rjs/require.js', '!./rjs/dist/pages/**/dev.js'])
		.pipe(gulp.dest(path.resolve(desDir, './static/pc/js/dist/')));

	console.log('------****** 生产环境准备 rjs/dist/js文件拷贝完成 ******------');
	return stream;
});
// 删除指定目录
gulp.task('deletetargetdist', function(cd) {
	var stream = gulp.src(path.resolve(desDir, './static/pc/js/dist/'), {
		read: false
	}).pipe(clean({
		force: true
	}));

	console.log('------****** 生产环境准备 目标dist目录成功删除！******------');
	return stream;
});
/**
 * 1、清空本地build;
 * 2、清空本地rjs/dist;
 * 3、删除指定目录;
 * 4、删除原msbuild.json文件;
 * 5、重新生成build;
 * 6、重新生成r.js配置文件;
 * 7、打包js文件;
 * 8、执行css img prod,拷贝文件到相应目录;
 * 9、拷贝dist中的js文件到指定目录
 */

//  cleanstep
gulp.task('cleanstep', function(cb) {
	runSequence('cleanbuild', 'cleanrjsdist', 'cleanmsbuildjs', 'deletetargetdist',cb);
});
// devstep 重新生成img,css文件
gulp.task('devstep', function(cb) {
	runSequence('devcopyhtml', 'imgtiny', 'devcopycss', 'devcopyjsfile', 'devcopyjsassignhtmlfile', 'devcopy3rdjsfile', 'scsstocss', cb);
});
// prodstep
gulp.task('prodstep', function(callback) {
	runSequence('cleanstep', ['devstep', 'createbuildjs'], 'rjs', ['prodImgcopy', 'prodcssmd5', 'prodjs'], 'webserver', function() {
		console.log('------****** Finish prod. ******------');
	});

	console.log('------****** 生产环境准备 发布包已准备就绪 ******------');
}).on('task_err', function(err) {
	console.log('------****** 生产环境准备 发布包打包失败 ******------', err);
});