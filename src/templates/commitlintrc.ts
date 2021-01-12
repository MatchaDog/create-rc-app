/**
 * @Author: Hans
 * @Date: 2021-01-12 15:13:36
 * @LastEditTime: 2021-01-12 17:20:26
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/commitlintrc.ts
 * @Description:
 */
const getCommitlint = (): string => `module.exports = {
    extends: ["@commitlint/config-conventional"],
};`;

export default getCommitlint;
