// 'use strict';

const _ = require( 'lodash' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );
// const path = require( 'path' );
// const q = require( 'q' );
// const tap = require( 'gulp-tap' );
// const zip = require( 'gulp-zip' );
const del = require( 'del' );

// Clean temporary files from unit
gulp.task( 'clean', function() {
    return del.sync( [
        '.sourcemaps',
        'www'
    ], { cwd: '.', force: true } );
} );

