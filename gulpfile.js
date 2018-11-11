var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var typedoc = require("gulp-typedoc");
var concat = require('gulp-concat');
var deleteLines = require('gulp-delete-lines');

/** Compile task */
gulp.task("compile", function(){
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./build"));
});

gulp.task("declaration", function(){
    return gulp
        .src(['src/index.d.ts', 'src/interfaces/*.interface.ts'])
        .pipe(concat('index.d.ts'))
        .pipe(deleteLines({
            'filters': [
                /import /i
            ]
        }))
        .pipe(gulp.dest('./build'));
});

/** Docs task */
gulp.task("typedoc", function(){
    return gulp
        .src(["src/**/*.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es2017",
            includeDeclarations: true,
            out: "docs/",
            name: "Challonge-ts",
            ignoreCompilerErrors: false,
            version: true,
            externalPattern: "**/node_modules/**",
            excludeExternals: true,
            mode: 'file'
        }))
    ;
});

/** Build */
gulp.task('build', gulp.series('compile', 'declaration', 'typedoc'));