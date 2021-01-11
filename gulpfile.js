/*
 * @Date: 2020-08-05 11:12:51
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-08-21 17:33:18
 * @FilePath: /hooooks/gulpfile.js
 */
const { dest, series } = require("gulp");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const del = require("del");

async function clean() {
    await del("lib/**");
}

function commonjs() {
    const tsProject = ts.createProject("tsconfig.json", {
        module: "commonjs",
    });
    return tsProject
        .src()
        .pipe(tsProject())
        .pipe(
            babel({
                configFile: "./.babelrc",
            }),
        )
        .pipe(concat("crca.min.js"))
        .pipe(uglify())
        .pipe(dest("lib/"));
}

exports.default = series(clean, commonjs);
