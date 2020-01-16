const proxy = require('http-proxy-middleware')
// RAP代理服务器
const RAP_SERVER = 'http://rap2api.taobao.org/app/mock/14718'

module.exports = app => {
    app.use(
        proxy('/api', {
            target: RAP_SERVER,
            secure: false,
            changeOrigin: true,
            cookieDomainRewrite: '',
            pathRewrite: { '^/api': '' }
        })
    )
}
