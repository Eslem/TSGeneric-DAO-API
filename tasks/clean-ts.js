import gulp from 'gulp';
import clean from 'gulp-clean';

let base = './src/'
let tests = './test/'
let files = [
  base+'**/*.js',
  base+'**/*.map',
  tests+'**/*.js',
  tests+'**/*.map'
]

gulp.task('clean', () => {
    return gulp.src(files, {
            read: false
        })
        .pipe(clean());
});
