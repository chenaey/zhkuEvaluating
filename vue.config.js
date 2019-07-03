module.exports = {

    devServer: {
        proxy: {
            '/api': {
                // target: 'http://123.197.234.190:81', //对应自己的接口
                target: 'http://127.0.0.1:5000', //对应自己的接口
                // target: 'http://101.132.179.60', //对应自己的接口
                changeOrigin: true,
                ws: false,
                // pathRewrite: {
                //     '^/api': '/api'
                // }
            },
        }
    }
}
