/**
 * @Author: Hans
 * @Date: 2021-01-08 16:36:59
 * @LastEditTime: 2021-01-11 16:36:58
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/init.ts
 * @Description:
 */
import { checkAppNameExist, checkYarn } from "./utils";
import * as inquirer from "inquirer";
import * as path from "path";
import * as chalk from "chalk";
import create from "./create";

export type initOpts = {
    backend?: boolean;
    html5?: boolean;
    ssr?: boolean;
    component?: boolean;
    toolkit?: boolean;
};

const init = async (name: string, { backend, html5, ssr, component, toolkit }: initOpts) => {
    const dirPath = path.resolve(name);
    const dirName = path.basename(dirPath);
    console.log(dirPath);
    console.log(dirName);

    await checkAppNameExist(dirName);
    if (backend) {
        const result = await inquirer.prompt([
            {
                message: "Check if typescript is needed",
                name: "ts",
                type: "confirm",
                default: false,
            },
            {
                message: "Check the CSS preprocessor needed",
                name: "css",
                type: "checkbox",
                choices: ["less", "scss", "stylus"],
                default: ["less"],
            },
            {
                message: "Check the lint needed",
                name: "lint",
                type: "checkbox",
                choices: ["eslint", "stylelint", "commitlint"],
                default: ["eslint", "stylelint", "commitlint"],
            },
            {
                message: "Check if antd is needed",
                name: "antd",
                type: "confirm",
                default: true,
            },
        ]);
        console.log();
        console.log(`Creating a new React app in ${chalk.green(dirPath)}`);
        console.log();
        create({ name, useYarn: checkYarn() });
    }
};

export default init;
