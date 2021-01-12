/**
 * @Author: Hans
 * @Date: 2021-01-11 18:03:45
 * @LastEditTime: 2021-01-12 20:42:36
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/package.ts
 * @Description:
 */
const getPkgTemplate = (name: string, opts: any): string => {
    let baseDevDependencies: { [index: string]: string } = {
        autoprefixer: "^9.7.4",
        "clean-webpack-plugin": "^3.0.0",
        "compression-webpack-plugin": "^3.0.1",
        "css-loader": "^3.3.2",
        "file-loader": "^6.0.0",
        happypack: "^5.0.1",
        "hard-source-webpack-plugin": "^0.13.1",
        "html-webpack-plugin": "^3.2.0",
        "mini-css-extract-plugin": "^0.9.0",
        "optimize-css-assets-webpack-plugin": "^5.0.3",
        "postcss-loader": "^3.0.0",
        prettier: "^2.0.5",
        "url-loader": "^4.1.0",
        webpack: "^4.43.0",
        "webpack-bundle-analyzer": "^3.6.0",
        "webpack-cli": "^3.3.9",
        "webpack-dev-server": "^3.8.2",
        "webpack-merge": "^4.2.2",
        webpackbar: "^4.0.0",
    };
    let baseScripts: { [index: string]: string } = {
        start: "export NODE_ENV=development && webpack-dev-server --config ./config/webpack.config.dev.js",
        build: "export NODE_ENV=production && webpack --config ./config/webpack.config.prod.js",
        "lint:prettier": "prettier --check src/",
        "lint:prettier_fix": "prettier --write src/",
    };
    baseScripts.lint = `${opts?.lint?.includes("stylelint") ? `npm run lint:css && ` : ""}${
        opts?.lint?.includes("eslint") ? `npm run lint:es && ` : ""
    }npm run lint:prettier`;
    baseScripts["lint:fix"] = `${opts?.lint?.includes("stylelint") ? `npm run lint:css_fix && ` : ""}${
        opts?.lint?.includes("eslint") ? `npm run lint:es_fix && ` : ""
    }npm run lint:prettier_fix`;
    if (opts?.lint?.includes("commitlint")) {
        baseDevDependencies = {
            ...baseDevDependencies,
            "@commitlint/cli": "^9.1.1",
            "@commitlint/config-conventional": "^9.1.1",
            husky: "^4.2.5",
            "lint-staged": "^10.2.11",
        };
    }
    if (opts?.lint?.includes("eslint")) {
        baseDevDependencies = {
            ...baseDevDependencies,
            "@typescript-eslint/eslint-plugin": "^3.4.0",
            "@typescript-eslint/parser": "^3.4.0",
            eslint: "^7.12.1",
            "eslint-config-airbnb": "^18.2.0",
            "eslint-config-prettier": "^6.15.0",
            "eslint-plugin-babel": "^5.3.1",
            "eslint-plugin-import": "^2.22.1",
            "eslint-plugin-jest": "^24.1.0",
            "eslint-plugin-jsx-a11y": "^6.4.1",
            "eslint-plugin-prettier": "^3.1.4",
            "eslint-plugin-react": "^7.21.5",
            "eslint-plugin-react-hooks": "^4.2.0",
        };
        baseScripts = {
            ...baseScripts,
            "lint:es": "eslint src/ --ext .ts --ext .tsx",
            "lint:es_fix": "eslint src/ --ext .ts --ext .tsx --fix",
        };
    }
    if (opts?.lint?.includes("stylelint")) {
        baseDevDependencies = {
            ...baseDevDependencies,
            stylelint: "^13.8.0",
            "stylelint-a11y": "^1.2.3",
            "stylelint-config-prettier": "^8.0.2",
            "stylelint-config-rational-order": "^0.1.2",
            "stylelint-config-standard": "^20.0.0",
            "stylelint-declaration-block-no-ignored-properties": "^2.3.0",
            "stylelint-order": "^4.1.0",
        };
        baseScripts = {
            ...baseScripts,
            "lint:css": "stylelint src/**/*.{less,css}",
            "lint:css_fix": "stylelint src/**/*.{less,css} --fix",
        };
    }
    if (opts?.css?.includes("less")) {
        baseDevDependencies = {
            ...baseDevDependencies,
            less: "^3.10.3",
            "less-loader": "^5.0.0",
        };
    }
    if (opts?.css?.includes("scss")) {
        baseDevDependencies = {
            ...baseDevDependencies,
            sass: "^1.32.2",
            "sass-loader": "^10.1.0",
        };
    }
    if (opts?.css?.includes("stylus")) {
        baseDevDependencies = {
            ...baseDevDependencies,
            stylus: "^0.54.8",
            "stylus-loader": "^4.3.2",
        };
    }
    if (opts?.antd) {
        baseDevDependencies = {
            ...baseDevDependencies,
            stylus: "^0.54.8",
            "ts-import-plugin": "^1.6.2",
        };
    }
    if (opts?.ts) {
        baseDevDependencies = {
            ...baseDevDependencies,
            "@types/react": "^16.9.16",
            "@types/react-dom": "^16.9.4",
            "@types/react-router-dom": "^5.1.3",
            "ts-loader": "^8.0.1",
            typescript: "^3.9.5",
        };
    } else {
        baseDevDependencies = {
            ...baseDevDependencies,
            "@babel/plugin-transform-runtime": "^7.12.10",
            "@babel/preset-env": "^7.12.11",
            "@babel/preset-react": "^7.12.10",
            "babel-loader": "^8.2.2",
        };
    }

    return `{
        "name": "${name}",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "author": "",
        "scripts": ${JSON.stringify(baseScripts)},
        "dependencies": {
            ${opts?.antd ? `"antd": "^4.8.3",` : ``}
            "react": "^16.12.0",
            "react-dom": "^16.12.0",
            "react-router-dom": "^5.1.2"
        },
        "devDependencies": ${JSON.stringify(baseDevDependencies)},
        ${
            opts?.lint?.includes("commitlint")
                ? ` "husky": {
            "hooks": {
                "pre-commit": "lint-staged",
                "commit-msg": "npm run lint:commit"
            }
        },`
                : ""
        }
        ${
            opts?.lint?.includes("eslint") || opts?.lint?.includes("stylelint")
                ? `"lint-staged": {
                ${
                    opts?.lint?.includes("eslint")
                        ? `"src/**/*.{js,jsx,ts,tsx}": [
                    "npm run lint:es_fix",
                    "npm run lint:prettier_fix"
                ],`
                        : ""
                }
                ${
                    opts?.lint?.includes("stylelint")
                        ? `"src/**/*.{css,less,scss,stylus}": [
                        "npm run lint:css_fix",
                        "npm run lint:prettier_fix"
                    ]`
                        : ""
                }
        }`
                : ""
        }
}`;
};

export default getPkgTemplate;
