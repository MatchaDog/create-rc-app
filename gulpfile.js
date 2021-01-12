/*
 * @Date: 2020-08-05 11:12:51
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-08-21 17:33:18
 * @FilePath: /hooooks/gulpfile.js
 */
const gulp = require("gulp");
const { dest, series } = require("gulp");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
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
        .pipe(dest("lib/"));
}

exports.default = series(clean, commonjs);
