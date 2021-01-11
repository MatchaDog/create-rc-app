/**
 * @Author: Hans
 * @Date: 2021-01-08 16:36:59
 * @LastEditTime: 2021-01-08 16:57:31
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/init.ts
 * @Description:
 */
const { checkAppNameExist } = require("./utils");

const init = async ({}) => {
    console.log("before check");
    await checkAppNameExist();
    console.log("check");
};

export default init;
