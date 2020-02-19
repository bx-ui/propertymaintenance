
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
// var baseUrl = 'http://10.153.69.158:4001';
// var baseUrl = 'http://10.138.22.228:8085';
var baseUrl = 'http://10.133.85.73:4005';
// var baseUrl = 'http://10.153.73.182:4001';  //qq
// var baseUrl = 'http://10.153.95.79:4001'; 
var newBaseUrl = 'http://10.133.85.73:4005';
var moneyUrl = 'http://144.123.47.148:8089'
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
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
    },
    dev: {
        env: require('./dev.env'),
        port: 8000,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        host: 'localhost',
        assetsPublicPath: '/',
        proxyTable: {
            // inspection/inspectionItems/tree
            '/inspection': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/inspection': '/inspection'
                }
            },
            '/auth': {
                target: newBaseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/auth': '/auth'
                }
            },
            '/admin': {
                target: newBaseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/admin': '/admin'
                }
            },
            '/maintenance': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/maintenance': '/maintenance'
                }
            },
            '/personnel': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/personnel': '/personnel'
                }
            },
          '/api': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/code': {
                target: newBaseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/code': '/code'
                }
            },
            '/gen': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/gen': '/gen'
                }
            },
            '/daemon': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/daemon': '/daemon'
                }
            },
            '/plan':{
                target:baseUrl,
                changeOrigin:true,
                pathRewrite:{
                    '^/plan':"/plan"
                }
            },
             '/property':{
                target:moneyUrl,
                changeOrigin:true,
                pathRewrite:{
                    '^/property':"/property"
                }
            },
        },
        cssSourceMap: false
    }
}
