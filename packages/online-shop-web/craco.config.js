// eslint-disable-next-line @typescript-eslint/no-require-imports
const CracoLessPlugin = require("craco-less")

module.exports = {
    // 跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://ceshi3.dishait.cn",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/api"
                }
            }
            // "/local": {
            //     target: "http://localhost:3001",
            //     changeOrigin: true,
            //     pathRewrite: {
            //         "^/local": "/local"
            //     }
            // }
        }
    },
    // 使用less
    plugins: [
        {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {},
                        javascriptEnabled: true
                    }
                }
            }
        }
    ]
}
