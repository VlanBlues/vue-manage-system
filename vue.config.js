'use strict'
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
      open: true,
      port: 8080,
        /*proxy: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }*/
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: 'title',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
};
