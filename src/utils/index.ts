/**
 * @Author: Hans
 * @Date: 2021-01-08 16:37:44
 * @LastEditTime: 2021-01-08 16:53:18
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/utils/index.ts
 * @Description:
 */
const execSync = require("child_process").execSync;
const fse = require("fs-extra");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const validateProjectName = require("validate-npm-package-name");
const semver = require("semver");

// 是否安装了yarn
const checkYarn = () => {
    try {
        execSync("yarnpkg --version", { stdio: "ignore" });
        return true;
    } catch (e) {
        return false;
    }
};

// 检查NODE版本
const checkNodeVersion = () => {
    // node版本>=10
    const result = semver.satisfies(process.versions.node, ">=10");
    if (!result) {
        console.warn(
            logSymbols.warning,
            chalk.yellow(
                `Current NODE is${chalk.green(
                    `"${process.versions.node}"`
                )}, shu shu wo a jian yi ni sheng ji dao 10 yi shang\n`
            )
        );
    }
};

// 校验名称合法性
const checkAppName = (appName: string) => {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
        console.error(
            logSymbols.error,
            chalk.red(
                `Cannot create a project named ${chalk.green(
                    `"${appName}"`
                )} because of npm naming restrictions:\n`
            )
        );
        [
            ...(validationResult.errors || []),
            ...(validationResult.warnings || []),
        ].map((error) => {
            console.error(logSymbols.error, chalk.red(`（｀へ´）  ${error}`));
        });
        console.error(
            logSymbols.error,
            chalk.red("\nPlease choose a different project name")
        );
        process.exit(1);
    }
};

// 文件名是否存在
const checkAppNameExist = (dirPath: string) => {
    return fse.ensureDirSync(dirPath);
};

export { checkYarn, checkNodeVersion, checkAppName, checkAppNameExist };
