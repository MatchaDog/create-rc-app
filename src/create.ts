/*
 * @Date: 2020-09-18 15:31:06
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-09-21 17:23:01
 * @FilePath: /create-rc-app/src/create.js
 */
import * as fse from "fs-extra";
import * as chalk from "chalk";
import * as ora from "ora";
import * as logSymbols from "log-symbols";
import * as path from "path";
import install from "./install";

import { getEslintIgnore, getPrettierIgnore } from "./templates/ignore";
import getEslint from "./templates/eslintrc";
import getStylelint from "./templates/stylelintrc";
import getCommitlint from "./templates/commitlintrc";
import getPrettier from "./templates/prettier";
import getPackageJson from "./templates/package";
import getBabel from "./templates/babelrc";
import getTs from "./templates/tsconfig";
import getHtml from "./templates/public";
import getPath from "./templates/config/paths";
import getImport from "./templates/config/webpack.import";
import getDevWebpack from "./templates/config/webpack.config.dev";
import getProdWebpack from "./templates/config/webpack.config.prod";
import getCommonWebpack from "./templates/config/webpack.config.common";
import getIndex from "./templates/src";
import getApp from "./templates/src/pages/App";

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

const create = async ({
    name,
    opts,
    initOpts,
}: {
    name: string;
    opts: any;
    initOpts: {
        backend?: boolean;
        html5?: boolean;
        ssr?: boolean;
        component?: boolean;
        toolkit?: boolean;
    };
}): Promise<void> => {
    const spinner = ora("Installing packages").start();
    try {
        console.log(chalk.green("Making template files and dictionaries..."));
        // 目标路径
        const targetDir = path.join(process.cwd(), name);
        // 目标路径创建文件夹
        await fse.mkdirp(targetDir);
        // 写入package.json
        if (initOpts.backend) {
            // make lint file
            if (opts?.lint?.includes("eslint")) {
                // eslint
                await fse.writeFile(path.join(targetDir, ".eslintrc.js"), getEslint());
                // eslintignore
                await fse.writeFile(path.join(targetDir, ".eslintignore"), getEslintIgnore());
            }
            if (opts?.lint?.includes("stylelint")) {
                // stylelint
                await fse.writeFile(path.join(targetDir, ".stylelintrc.js"), getStylelint());
            }
            if (opts?.lint?.includes("commitlint")) {
                // commitlint
                await fse.writeFile(path.join(targetDir, ".commitlintrc.js"), getCommitlint());
            }
            if (opts.ts) {
                // tsconfig
                await fse.writeFile(path.join(targetDir, "tsconfig.json"), getTs());
            } else {
                // babel
                await fse.writeFile(path.join(targetDir, ".babelrc.js"), getBabel(opts));
            }

            // html and public dictionary
            const publicDir = path.join(targetDir, "public");
            await fse.mkdirp(publicDir);
            await fse.writeFile(path.join(publicDir, "index.html"), getHtml());
            // webpack config files
            const configDir = path.join(targetDir, "config");
            await fse.mkdirp(configDir);
            await fse.writeFile(path.join(configDir, "webpack.config.common.js"), getCommonWebpack(name, opts));
            await fse.writeFile(path.join(configDir, "webpack.config.prod.js"), getProdWebpack());
            await fse.writeFile(path.join(configDir, "webpack.config.dev.js"), getDevWebpack());
            await fse.writeFile(path.join(configDir, "webpack.import.js"), getImport());
            await fse.writeFile(path.join(configDir, "paths.js"), getPath(opts));
            // base pages and components files
            const srcDir = path.join(targetDir, "src");
            const pagesDir = path.join(srcDir, "pages");
            await fse.mkdirp(srcDir);
            await fse.mkdirp(pagesDir);
            await fse.writeFile(path.join(srcDir, opts.ts ? "index.tsx" : "index.jsx"), getIndex());
            await fse.writeFile(path.join(pagesDir, opts.ts ? "App.tsx" : "App.jsx"), getApp(opts));
            // package.json
            await fse.writeFile(
                path.join(targetDir, "package.json"),
                JSON.stringify(JSON.parse(getPackageJson(name, opts)), null, 4),
            );
            // prettier
            await fse.writeFile(path.join(targetDir, ".prettierrc"), getPrettier());
            await fse.writeFile(path.join(targetDir, ".prettierignore"), getPrettierIgnore());
        }
        // await readAndMkdir(targetDir, templateDir);
        spinner.succeed("Templates made successfully");
        console.log(chalk.green("Installing template dependencies..."));
        // 下载文件
        await install({ cwd: targetDir, useYarn: opts.package === "yarn" });
        await fse.writeFile(path.join(targetDir, ".gitignore"), "node_modules");
        spinner.succeed("Create-rc-app init successfully");
        console.log(chalk.green(`You can type 'cd ${name}', and 'npm start' to setup your project`));
        process.exit();
    } catch (error) {
        spinner.fail();
        console.log(logSymbols.error, chalk.red(error));
        process.exit();
    }
};

export default create;
