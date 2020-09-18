/*
 * @Date: 2020-09-18 17:24:23
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-09-18 18:04:46
 * @FilePath: /cli/utils/fs-promise.js
 */
const fs = require("fs");
const promisify = require("./promisify");
const mkdirp = require("mkdirp");

exports.writeFile = promisify(fs.writeFile);
exports.readdir = promisify(fs.readdir);
exports.mkdirp = promisify(mkdirp);
exports.stat = promisify(fs.stat);
