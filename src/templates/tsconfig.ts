/**
 * @Author: Hans
 * @Date: 2021-01-11 18:32:30
 * @LastEditTime: 2021-01-12 15:58:43
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/tsconfig.ts
 * @Description:
 */
const getTs = (): string => `{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "jsx": "react",
        "lib": ["es6", "dom", "ES2017.Object"],
        "module": "commonjs",
        "moduleResolution": "node",
        "noImplicitAny": true,
        "sourceMap": true,
        "strict": true,
        "strictNullChecks": false, //允许null为其他类型子集
        "target": "ES2019",
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "typeRoots": ["node_modules/@types", "src/types"]
    },
    "exclude": ["node_modules"]
}`;
export default getTs;
