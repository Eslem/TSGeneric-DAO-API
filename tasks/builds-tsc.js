import gulp from 'gulp';
import tsc from 'gulp-typescript';

const TS_CONFIG = './tsconfig.json';

gulp.task('compile', () => {
    let tsconfigSrc = tsc.createProject(TS_CONFIG);

    return tsconfigSrc.src()
        .pipe(tsc(tsconfigSrc))
        .js
        .pipe(gulp.dest('.'));
});
