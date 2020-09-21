/*
 * @Date: 2020-09-18 17:24:38
 * @LastEditors: Hans
 * @description:
 * @LastEditTime: 2020-09-21 16:26:14
 * @FilePath: /create-rc-app/utils/promisify.js
 */
module.exports = function promisify(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, ...res) => {
                console.log("error",err);
                console.log("res",res);
                if (err) return reject(err);
                if (res.length === 1) return resolve(res[0]);
                resolve(res);
            });
        });
    };
};
