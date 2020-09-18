#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const create = require("./src/create");

program
    .version("0.1.0") // --version 版本
    .command("init <name> [branch]") // 初始化命令
    .description("初始化项目文件")
    .action((name, branch) => {
        // 得到name
        if (fs.existsSync(name)) {
            // 错误提示项目已存在，避免覆盖原有项目
            console.log(logSymbols.error, chalk.red("项目已存在"));
            return;
        }
        create(name);
    });

program.parse(process.argv); // 解析变量
