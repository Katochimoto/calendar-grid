import gulp from 'gulp';
import rollup from 'rollup-stream';
// import gulpif from 'gulp-if';
// import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gulpConnect from 'gulp-connect';
import mocha from 'gulp-mocha';
import minimist from 'minimist';
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import vendorRollup from './tasks/rollup.vendor.js';
import indexRollup from './tasks/rollup.index.js';

var NODE_ENV = process.env.npm_lifecycle_event === 'build' ?
  'production' :
  'development';

const OPTIONS = minimist(process.argv.slice(2), {
  string: [
    'env',
    'dist',
    'src'
  ],
  default: {
    env: NODE_ENV,
    dist: 'dist',
    src: 'src'
  }
});

const isDev = OPTIONS.env === 'development';
OPTIONS.isDev = isDev;

export function index () {
  const moduleName = 'index';
  const options = { ...OPTIONS, moduleName };

  return rollup(indexRollup(options))
    .pipe(source('index.js', OPTIONS.src))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    // .pipe(gulpif(!isDev, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function vendor () {
  const moduleName = 'vendor';
  const options = { ...OPTIONS, moduleName };

  return rollup(vendorRollup(options))
    .pipe(source('vendor.js', OPTIONS.src))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    // .pipe(gulpif(!isDev, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function watch() {
  gulp.watch([
    'src/**/*.js',
    'src/**/*.less',
    'src/**/*.svg'
  ], gulp.parallel(index));
}

export function clean () {
  return del([ OPTIONS.dist + '/**/*' ]);
}

export function test () {
  return gulp.src([
      `${OPTIONS.src}/**/*.spec.js`,
      `!${OPTIONS.src}/**/node_modules/**`
    ], { read: false })
    .pipe(mocha({
      require: [
        'babel-register'
      ]
    }));
}

export function connect () {
  gulpConnect.server({
    root: 'dist',
    livereload: false
  });
}

const build = gulp.series(
  clean,
  gulp.parallel(index, vendor)
);

export {
  build
};

export default build;
