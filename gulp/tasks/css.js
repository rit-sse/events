'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import paths from '../config';

gulp.task('build:css', () => gulp.src(paths.source.scss).pipe(sass()).pipe(gulp.dest(paths.build.css)));
