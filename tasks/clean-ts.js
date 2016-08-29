import gulp from 'gulp';
import clean from 'gulp-clean';

let base = './src/'
let files = [
  base+'**/*.js',
  base+'**/*.map'
]

gulp.task('clean', () => {
    return gulp.src(files, {
            read: false
        })
        .pipe(clean());
});
