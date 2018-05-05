var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');

var neoblock_vendor = [
    './assets/**/*.*',
    './blockly/**/*.*',
    './vendor/**/*.*',    
];

var neoblock_main = [
    './neosrc/*.js',    
    './index.js',
];

var neomodule_block = {
  source: [
    'neosrc/NeoBlock/NeoBlock.js',      
    'neosrc/NeoModules/*/*_block.js'
    ],
  target: 'neosrc/NeoBlock/NeoBlock.js'
}

var neomodule_gen = {
    source: [
        'neosrc/NeoBlock/NeoGen.js',              
        'neosrc/NeoModules/*/*_gen.js'
    ],
    target: 'neosrc/NeoBlock/NeoGen.js'
}

var neomodule_xml = {
    source: 'neosrc/NeoModules/*/*.xml',
    target: 'NeoGen.xml'
}


function escape_string(str) {
    str = str.replace(/(?:\r\n|\r|\n)/g, '/n');
    str = str.replace( '{{' , "' + ");
    str = str.replace( '}}' , " + '");

    return "'" + str + "'";
}

gulp.task('main', function() {
    return gulp.src(neoblock_main , { base: './' })
      .pipe(gulp.dest('./dist/'));
});

gulp.task('vendor', function() {
    return gulp.src(neoblock_vendor , { base: './' })
      .pipe(gulp.dest('./dist/'));
});


gulp.task('block', function() {
    return gulp.src(neomodule_block.source)
      .pipe(concat(neomodule_block.target))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('gen', function() {
    return gulp.src(neomodule_gen.source)
     .pipe(fileinclude({
         basepath: '@file',
         prefix: '____',
         filters: {
            esc : escape_string
          } 
        }))
     .pipe(concat(neomodule_gen.target))
     .pipe(gulp.dest('./dist/'));
});

gulp.task('xml', function() {
    return gulp.src(neomodule_xml.source)
      .pipe(concat(neomodule_xml.target))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('indexml', function() {
    return gulp.src('./index.html')
      .pipe(fileinclude({
            basepath: './dist/',
       }))   
      .pipe(gulp.dest('./dist/'));
});

gulp.task('electron', function(){
    var exec = require('child_process').exec;
    exec('electron ./dist');
});

gulp.task('default', [ 'vendor', 'main', 'block', 'gen', 'xml', 'indexml' ]);
gulp.task('run', [ 'vendor', 'main', 'block', 'gen', 'xml', 'indexml', 'electron' ]);
