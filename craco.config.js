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
        }
    },
    // style: {
    //     postcss: {
    //         loaderOptions: {
    //             ident: 'postcss',
    //             plugins: () => [
    //                 require('postcss-px-to-viewport')({
    //                     unitToConvert: 'px',
    //                     viewportWidth: 3750,
    //                     unitPrecision: 5,
    //                     propList: ['*'],
    //                     viewportUnit: 'rem',
    //                     fontViewportUnit: 'rem',
    //                     selectorBlackList: ['.ignore'],
    //                     minPixelValue: 1,
    //                     mediaQuery: false,
    //                     replace: true,
    //                     exclude: [],
    //                     landscape: false,
    //                     landscapeUnit: 'rem',
    //                     landscapeWidth: 640,
    //                 })
    //             ],
    //         },
    //     }
    // },
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
    // babel: {
    //     plugins: [
    //         [
    //             'import',
    //             {
    //                 'libraryName': 'antd',
    //                 'libraryDirectory': 'es',
    //                 'style': 'css'
    //             }
    //         ]
    //     ]
    // },
    devServer: {
        proxy: {
            "/api": {
                target: "https://admin.yunshanggroup.cn",
                changeOrigin: true,
                // pathRewrite: {
                //     "^/api": ""
                // }
            }
        }
    }
}
