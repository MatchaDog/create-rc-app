/*
 * @Date: 2020-09-18 19:02:11
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-09-21 15:46:30
 * @FilePath: /create-rc-app/src/install.js
 */
const spawn = require("cross-spawn");

module.exports = function install(options) {
    const cwd = options.cwd || process.cwd();
    return new Promise((resolve, reject) => {
        const command = options.useYarn ? "yarn" : "npm";
        const args = ["install"];
        const child = spawn(command, args, {
            cwd,
            stdio: ["pipe", process.stdout, process.stderr],
        });

        child.once("close", (code) => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(" ")}`,
                });
                return;
            }
            resolve();
        });
        child.once("error", reject);
    });
};
