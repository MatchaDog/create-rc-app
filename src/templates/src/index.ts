/**
 * @Author: Hans
 * @Date: 2021-01-12 17:21:39
 * @LastEditTime: 2021-01-12 19:49:30
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/src/index.ts
 * @Description:
 */
const getIndex = (): string => `import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";

ReactDOM.render(<App />, document.getElementById("root"));
`;

export default getIndex;
