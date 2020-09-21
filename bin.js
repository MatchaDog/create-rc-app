#!/usr/bin/env node
const { program } = require("commander");
const execSync = require("child_process").execSync;
const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const validateProjectName = require("validate-npm-package-name");
const semver = require("semver");

const create = require("./src/create");
const packageJson = require("./package.json");

const checkYarn = () => {
    try {
        execSync("yarnpkg --version", { stdio: "ignore" });
        return true;
    } catch (e) {
        return false;
    }
};

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

const checkAppName = (appName) => {
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

program
    .version(packageJson.version) // --version 版本
    .command("init <name> [branch]") // 初始化命令
    .description("初始化项目文件")
    .action(async (name) => {
        const dirPath = path.resolve(name);
        const dirName = path.basename(dirPath);
        // 校验node版本
        checkNodeVersion();
        // 校验名称合法性
        checkAppName(dirName);
        // 文件名是否存在
        fse.ensureDirSync(dirPath);
        console.log();
        console.log(`Creating a new React app in ${chalk.green(dirPath)}`);
        console.log();
        // 创建
        create({ name, useYarn: checkYarn() });
    });

program.parse(process.argv); // 解析变量
