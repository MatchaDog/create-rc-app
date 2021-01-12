/**
 * @Author: Hans
 * @Date: 2021-01-12 19:49:46
 * @LastEditTime: 2021-01-12 20:43:47
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/src/pages/App.ts
 * @Description:
 */
const getApp = (opts: any): string =>
    opts.ts
        ? `import React, { FC } from "react";

const App:FC = () => <div>App</div>;

export default App;`
        : `import React from "react";

const App = () => <div>App</div>;

export default App;`;

export default getApp;
