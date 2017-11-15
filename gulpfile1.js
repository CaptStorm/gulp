"use strict";

var gulp = require ('gulp');
var connect = require ('gulp-connect');
                              //runs a local dev server;
var open = require('gulp-open');
                              //open a url in webbrowser

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths:	{
		html: './src/*.html',
		dist: './dist'
	}
}

                              //start a local dev server
gulp.task('connect', function(){
                              //connect is a name for the task
                              //call connect.server
	connect.server({
                                //a chunk of json conditions
                                //rooot server is folder dist
		root:['dist'],
		port: config.port,
		base: config.getBaseUrl,
		livereload:true
	});
});
                              //2nd taskt tells to run 1st task first (connect) 
                              //go get html from dist folder and open it in the browser
gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ":" + config.port + '/'}));
});


gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
});


gulp.task('default', ['html', 'open', 'watch']);
