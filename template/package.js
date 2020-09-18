/*
 * @Date: 2020-09-18 15:49:53
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-09-18 15:53:17
 * @FilePath: /cli/template/package.js
 */
module.exports = function (name) {
    const template = `
  {
    "name": "${name}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "author": "",
    "scripts": {
        "start": "export NODE_ENV=development && webpack-dev-server --config ./config/webpack/webpack.config.dev.js",
        "build": "export NODE_ENV=production && webpack --config ./config/webpack/webpack.config.prod.js",
        "build:test": "export NODE_ENV=test && webpack --config ./config/webpack/webpack.config.prod.js",
        "build:pre-production": "export NODE_ENV=pre-production && webpack --config ./config/webpack/webpack.config.prod.js",
        "lint:ts": "eslint --ext .ts,.tsx src",
        "lint:style": "stylelint src/**/*.{less,css}",
        "lint:prettier": "prettier --write src"
    },
    "dependencies": {
        "axios": "^0.19.2",
        "dingtalk-jsapi": "^2.8.33",
        "history": "^4.10.1",
        "hooooks": "^1.0.10",
        "lodash-es": "^4.17.15",
        "react": "^16.12.0",
        "react-dom": "^16.12.0",
        "react-router-dom": "^5.1.2"
    },
    "devDependencies": {
        "@commitlint/cli": "^9.1.1",
        "@commitlint/config-conventional": "^9.1.1",
        "@types/lodash-es": "^4.17.3",
        "@types/react": "^16.9.16",
        "@types/react-dom": "^16.9.4",
        "@types/react-router-dom": "^5.1.3",
        "@typescript-eslint/eslint-plugin": "^3.4.0",
        "@typescript-eslint/parser": "^3.4.0",
        "autoprefixer": "^9.7.4",
        "clean-webpack-plugin": "^3.0.0",
        "compression-webpack-plugin": "^3.0.1",
        "css-loader": "^3.3.2",
        "eslint": "^7.3.1",
        "eslint-plugin-react-hooks": "^3.0.0",
        "file-loader": "^6.0.0",
        "happypack": "^5.0.1",
        "hard-source-webpack-plugin": "^0.13.1",
        "html-webpack-plugin": "^3.2.0",
        "husky": "^4.2.5",
        "less": "^3.10.3",
        "less-loader": "^5.0.0",
        "lint-staged": "^10.2.11",
        "mini-css-extract-plugin": "^0.9.0",
        "optimize-css-assets-webpack-plugin": "^5.0.3",
        "postcss-loader": "^3.0.0",
        "prettier": "^2.0.5",
        "source-map-loader": "^0.2.4",
        "stats-webpack-plugin": "^0.7.0",
        "stylelint": "^13.6.1",
        "stylelint-prettier": "^1.1.2",
        "ts-import-plugin": "^1.6.2",
        "ts-loader": "^8.0.1",
        "typescript": "^3.9.5",
        "uglifyjs-webpack-plugin": "^1.0.0-rc.0",
        "url-loader": "^4.1.0",
        "vconsole": "^3.3.4",
        "webpack": "^4.43.0",
        "webpack-bundle-analyzer": "^3.6.0",
        "webpack-cli": "^3.3.9",
        "webpack-dev-server": "^3.8.2",
        "webpack-merge": "^4.2.2",
        "webpackbar": "^4.0.0"
    }
  }
    `;
    return { template, dir: "", name: "package.json" };
};
