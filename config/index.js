const path = require('path')
const proxyConfig = require('./proxy.config')
const pathConfig = require('./path')
const internalIp = require('internal-ip')

// 重新组装proxy列表
const proxyTable = (function(proxyConfig) {
    const arr = []
    Object.keys(proxyConfig.proxyTable).forEach(function(context) {
        const target = proxyConfig.proxyTable[context]
        arr.push({
            context,
            target: proxyConfig.proxyTarget || target,
            changeOrigin: true,
            cookieDomainRewrite: '',
            pathRewrite: { '^/api': '' }
        })
    })
    return arr
})(proxyConfig)

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable,

        // Various Dev Server settings
        host: '0.0.0.0', // can use localhost & ip, also can be overwritten by process.env.HOST
        port: 8089, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined,
        public: proxyConfig.cookieDomain || internalIp.v4(),
        // useLocalIp: true, // open url with ip
        disableHostCheck: true, // can use host with bind ip to visit it
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(pathConfig.remote + '/index.html'),

        // Paths
        assetsRoot: path.resolve(pathConfig.remote + '/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}