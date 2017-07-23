var gulp = require('gulp');
var template = require('gulp-template');
var tap = require('gulp-tap');
var replace = require('gulp-replace');
var remoteSrc = require('gulp-remote-src');
var inject = require('gulp-inject');
var htmlmin = require('gulp-htmlmin');

var locales={
"zh_HK":{"languageCode":"hk-HK","path":"hk"},
"en_US":{"languageCode":"en-US","path":""},
"en_IN":{"languageCode":"en-IN","path":"in"}

};

gulp.task('default', function(){

for (var key in locales){

  gulp.src(['./src/index.html'])
    .pipe(replace('{languageCode}', locales[key].languageCode))
    .pipe(replace('{localeCode}',key))
    .pipe(inject(gulp.src(['./src/footer/'+key+'.html']), {
    starttag: '<!--injectFooter-->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }}))
    .pipe(inject(gulp.src(['./src/header/'+key+'.html']), {
    starttag: '<!--injectHeader-->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }}))    //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'+locales[key].path));
}
});