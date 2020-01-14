const RAP_SERVICE = 'http://rap2api.taobao.org/app/mock/14718'

module.exports = {
    proxyTable: {
        '/api/**': RAP_SERVICE
    }

    // 数据接口代理开关, 开启：连接本地服务调试，关闭：启用Rap数据
    // proxyTarget: 'http://101.37.90.97:13230'
}
