/**
 * @Author: Hans
 * @Date: 2021-01-08 16:45:20
 * @LastEditTime: 2021-01-11 16:31:16
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/index.ts
 * @Description:
 */
import { program } from "commander";
import init from "./init";
import { initOpts } from "./init";
const packageJson = require("../package.json");

program
    .version(packageJson.version, "-v --version") // --version 版本
    .usage("[command] [option]")
    .command("init <name>") // 初始化命令 create-rc-app init projectName -b | create-rc-app init projectName --backend
    .option("-b --backend", "Create a background project")
    .option("-h --html5", "Create a html5 project")
    .option("-s --ssr", "Create a ssr project")
    .option("-c --component", "Create a component library")
    .option("-t --toolkit", "Create a toolkit library")
    .description("初始化项目文件")
    .action(async (name: string, opts: initOpts) => {
        init(name, opts);
    });

program.parse(process.argv); // 解析变量
