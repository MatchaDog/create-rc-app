/*
 * @Date: 2020-09-18 15:31:06
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-09-21 10:23:52
 * @FilePath: /create-rc-app/src/create.js
 */
const path = require("path");
const fs = require("../utils/fs-promise");
const install = require("./install");
const chalk = require("chalk");
const ora = require("ora");
const logSymbols = require("log-symbols");

async function readAndMkdir(rootDir, dir) {
    try {
        const fileArr = await fs.readdir(dir);
        fileArr.map(async (fileName) => {
            try {
                const fileDir = path.join(dir, fileName);
                const stat = await fs.stat(fileDir);
                const isFileState = stat.isFile(); //是文件
                const isDirState = stat.isDirectory(); //是文件夹
                if (isFileState) {
                    await fs.writeFile(path.join(rootDir, fileName), "");
                }
                if (isDirState) {
                    // 从template的下级目录里截取文件夹名
                    const templateDirPath = fileDir.replace(dir, "");
                    // 拼接到指定目录
                    const targetDirPath = path.join(rootDir, templateDirPath);
                    // 在指定目录创建文件夹
                    await fs.mkdirp(targetDirPath);
                    //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                    readAndMkdir(targetDirPath, fileDir);
                }
            } catch (error) {
                console.log(chalk.red(error));
            }
        });
    } catch (error) {
        console.log(chalk.red(error));
    }
}

module.exports = async function (name) {
    const spinner = ora("下载模板中...").start();
    try {
        const targetDir = path.join(process.cwd(), name);
        // const templateDir = path.join(process.cwd(), "template");
        const templateDir = path.join("create-rc-app", "template");
        await fs.mkdirp(targetDir);
        const {
            template,
            dir,
            name: fileName,
        } = require("create-rc-app/template/package")(name);
        await fs.writeFile(
            path.join(targetDir, dir, fileName),
            template.trim()
        );
        readAndMkdir(targetDir, templateDir);
        spinner.succeed("模板下载完成");
        await install({ cwd: targetDir });
        spinner.succeed("项目初始化完成");
    } catch (error) {
        spinner.fail();
        console.log(logSymbols.error, chalk.red(error));
    }
};
