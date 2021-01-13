import { config } from "process";

/**
 * @Author: Hans
 * @Date: 2021-01-13 14:33:59
 * @LastEditTime: 2021-01-13 14:49:03
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/ignore.ts
 * @Description:
 */
const getEslintIgnore = (): string => `config
node_modules
build
`;

const getPrettierIgnore = (): string => `dist
es
lib
node_modules
`;

export { getPrettierIgnore, getEslintIgnore };
