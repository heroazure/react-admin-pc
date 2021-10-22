/* craco.config.js */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

const CracoLessPlugin = require('craco-less')
module.exports = {
    webpack: {
        alias: {
            "@": resolve("src"),
        },
        configure: (webpackConfig, {env, paths}) => {
            paths.appBuild = 'blindbox'
            webpackConfig.output = {
                ...webpackConfig.output,
                path: resolve('blindbox'),
                publicPath: process.env.NODE_ENV === 'development' ? '/' : '/blindbox/'
            }
            return webpackConfig
        },
    },
    style: {
        postcss: {
            loaderOptions: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-px-to-viewport')({
                        unitToConvert: 'px',
                        viewportWidth: 3750,
                        unitPrecision: 5,
                        propList: ['*'],
                        viewportUnit: 'rem',
                        fontViewportUnit: 'rem',
                        selectorBlackList: ['.ignore'],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: [],
                        landscape: false,
                        landscapeUnit: 'rem',
                        landscapeWidth: 640,
                    })
                ],
            },
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {'@primary-color': '#1DA57A'},
                        javascriptEnabled: true,
                    },
                },
            },
        }
    ],
    babel: {
        plugins: [
            [
                'import',
                {
                    'libraryName': 'antd-mobile',
                    'libraryDirectory': 'es',
                    'style': 'css'
                }
            ]
        ]
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://139.159.97.212:8020/",
                changeOrigin: true,
                // pathRewrite: {
                //     "^/api": ""
                // }
            }
        }
    }
}
