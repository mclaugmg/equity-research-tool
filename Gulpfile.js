/* eslint-disable no-console */
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const nodemon = require('gulp-nodemon');

gulp.task('browserify', scripts)
    .task('serve', serve);

function scripts() {
  const bundler = browserify({
    entries: ['./client/index.jsx'],
    transform: [[babelify, { presets: ['es2015', 'react'] }]],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
  });
  const watcher = watchify(bundler);

  return watcher
    .on('update', () => {
      const updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
      .on('error', (err) => {
        console.log('Error with compiling components', err.message);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./client/build/'));
      console.log('Updated!', `${Date.now() - updateStart}ms`);
    })
    // Create the initial bundle when starting the task
    .bundle()
    .on('error', (err) => {
      console.log('Error with compiling components', err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./client/build/'));
}

function serve() {
  nodemon({
    script: 'server/server.js',
    ignore: ['client/', 'build/'],
  });
}

gulp.task('default', ['browserify', 'serve']);
