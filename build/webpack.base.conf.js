const path = require('path')
const utils = require('./utils')
const config = require('../config')
const tsImportPlugin = require('ts-import-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(jsx?|tsx?)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/main.tsx',
        // vendor: ['react', 'react-dom', 'react-router-dom', 'axios']
    },
    output: {
        path: process.env.NODE_ENV === 'production' ? config.build.assetsRoot : config.dev.assetsRoot,
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src'),
            assets: resolve('src/assets'),
            components: resolve('src/components'),
            config: resolve('src/config'),
            libs: resolve('src/libs'),
            module: resolve('src/module'),
            store: resolve('src/store')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPlugin( /** options */ )]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
