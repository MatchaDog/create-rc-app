/**
 * @Author: Hans
 * @Date: 2021-01-08 16:45:20
 * @LastEditTime: 2021-01-08 17:05:20
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/index.ts
 * @Description:
 */
import { program } from "commander";
import create from "./create";
import packageJson from "../package.json";
import init from "./init";

program
    .version(packageJson.version) // --version 版本
    .usage("[command] [name] [action]")
    .command("init") // 初始化命令
    .option("-b --backend", "Create a background project")
    .option("-h --html5", "Create a html5 project")
    .option("-s --ssr", "Create a ssr project")
    .option("-c --component", "Create a component library")
    .option("-t --toolkit", "Create a toolkit library")
    .description("初始化项目文件")
    .action(async (opts) => {
        init(opts);
        return;
        // console.log();
        // console.log(`Creating a new React app in ${chalk.green(dirPath)}`);
        // console.log();
        // // 创建
        // create({ name, useYarn: checkYarn() });
    });

program.parse(process.argv); // 解析变量
