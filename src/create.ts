/*
 * @Date: 2020-09-18 15:31:06
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-09-21 17:23:01
 * @FilePath: /create-rc-app/src/create.js
 */
import fse from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import logSymbols from "log-symbols";
import * as path from "path";
import install from "./install";

const packageJSON = require("../template/package");

const readAndMkdir = (rootDir: string, dir: string) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve, reject) => {
        try {
            const fileArr = await fse.readdir(dir);
            fileArr.map(async (fileName: string) => {
                try {
                    const fileDir = path.join(dir, fileName);
                    const stat = await fse.stat(fileDir);
                    const isFileState = stat.isFile(); // 是文件
                    const isDirState = stat.isDirectory(); // 是文件夹
                    if (isFileState) {
                        // 不写入模板package
                        if (fileName !== "package.js") {
                            const content = await fse.readFile(fileDir);
                            await fse.writeFile(path.join(rootDir, fileName), content);
                            resolve();
                        }
                    }
                    if (isDirState) {
                        // 从template的下级目录里截取文件夹名
                        const templateDirPath = fileDir.replace(dir, "");
                        // 拼接到指定目录
                        const targetDirPath = path.join(rootDir, templateDirPath);
                        // 在指定目录创建文件夹
                        await fse.mkdirp(targetDirPath);
                        // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
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

const create = async (opts: { name: string; useYarn?: boolean }): Promise<void> => {
    const spinner = ora("Installing packages").start();
    try {
        // 目标路径
        const targetDir = path.join(process.cwd(), opts.name);
        // 模板路径
        const templateDir = path.join(__dirname, "../template");
        // 目标路径创建文件夹
        await fse.mkdirp(targetDir);
        // 读取package.js
        const { template, dir, name: fileName } = packageJSON(opts.name);
        // 写入package.json
        await fse.writeFile(path.join(targetDir, dir, fileName), template.trim());
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

export default create;
