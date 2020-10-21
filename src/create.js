/*
 * @Date: 2020-09-18 15:31:06
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-09-21 17:23:01
 * @FilePath: /create-rc-app/src/create.js
 */
const path = require("path");
const fse = require("fs-extra");
const install = require("./install");
const chalk = require("chalk");
const ora = require("ora");
const logSymbols = require("log-symbols");

const readAndMkdir = (rootDir, dir) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileArr = await fse.readdir(dir);
            fileArr.map(async (fileName) => {
                try {
                    const fileDir = path.join(dir, fileName);
                    const stat = await fse.stat(fileDir);
                    const isFileState = stat.isFile(); //是文件
                    const isDirState = stat.isDirectory(); //是文件夹
                    if (isFileState) {
                        const content = await fse.readFile(fileDir);
                        await fse.writeFile(
                            path.join(rootDir, fileName),
                            content
                        );
                        resolve();
                    }
                    if (isDirState) {
                        // 从template的下级目录里截取文件夹名
                        const templateDirPath = fileDir.replace(dir, "");
                        // 拼接到指定目录
                        const targetDirPath = path.join(
                            rootDir,
                            templateDirPath
                        );
                        // 在指定目录创建文件夹
                        await fse.mkdirp(targetDirPath);
                        //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        await readAndMkdir(targetDirPath, fileDir);
                    }
                } catch (error) {
                    console.log(logSymbols.error, chalk.red(error));
                    process.exit();
                }
            });
        } catch (error) {
            reject(error);
            console.log(logSymbols.error, chalk.red(error));
            process.exit();
        }
    });
};

const create = async (opts) => {
    const spinner = ora("Installing packages").start();
    try {
        // 目标路径
        const targetDir = path.join(process.cwd(), opts.name);
        // 模板路径
        const templateDir = path.join(__dirname, "../template");
        // 目标路径创建文件夹
        await fse.mkdirp(targetDir);
        // 读取package.js
        const { template, dir, name: fileName } = require(path.join(
            __dirname,
            "../template/package"
        ))(opts.name);
        // 写入package.json
        await fse.writeFile(
            path.join(targetDir, dir, fileName),
            template.trim()
        );
        // 删除package.js
        await fse.remove(path.join(targetDir, "package.js"));
        // 读取dependencies
        await readAndMkdir(targetDir, templateDir);
        spinner.succeed("Installing template dependencies");
        // 下载文件
        await install({ cwd: targetDir, useYarn: opts.useYarn });
        await fse.writeFile(path.join(targetDir, ".gitignore"), "node_modules");
        spinner.succeed("Create-rc-app init success");
        process.exit();
    } catch (error) {
        spinner.fail();
        console.log(logSymbols.error, chalk.red(error));
        process.exit();
    }
};

module.exports = create;
