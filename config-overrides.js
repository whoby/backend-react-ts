/**
 * 更改create-react-app脚手架的默认配置
 */
const { override, addWebpackAlias, addLessLoader, useEslintRc, fixBabelImports } = require('customize-cra')
const paths = require('react-scripts/config/paths')
const path = require('path')

// 修改打包目录
paths.appBuild = path.resolve(__dirname, 'dist')

module.exports = override(
    // 配置路径别名
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
    }),
    // antd按需加载
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es'
    }),
    // 添加less支持
    addLessLoader({
        javascriptEnabled: true
    }),
    // 使用自定义Eslint
    useEslintRc(),
    // 自定义config配置
    config => {
        // 去掉打包生产map文件
        config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
        return config
    }
)
