/**
 * @Author: Hans
 * @Date: 2021-01-12 15:21:23
 * @LastEditTime: 2021-01-12 15:31:51
 * @LastEditors: Do not edit
 * @FilePath: /create-rc-app/src/templates/public/index.ts
 * @Description:
 */
const getHTML = (): string => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <title><%= htmlWebpackPlugin.options.title %></title>
        <% for (let css in htmlWebpackPlugin.files.css) { %>
        <link href="./<%=htmlWebpackPlugin.files.css[css] %>" rel="stylesheet" />
        <% } %>
    </head>
    <body>
        <noscript>
            请刷新页面或更换主流浏览器
        </noscript>
        <div id="root"></div>
        <% for (let chunk in htmlWebpackPlugin.files.chunks) { %>
        <script type="text/javascript" src="./<%=htmlWebpackPlugin.files.chunks[chunk].entry %>"></script>
        <% } %>
    </body>
</html>
`;
export default getHTML;
