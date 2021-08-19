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
