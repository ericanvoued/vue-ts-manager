module.exports = {
    devServer: {
        https: true,
        proxy: {
            '^/merchant': {
                target: 'https://zkouge.cc',
                changeOrigin: false,
            },
        }
    }
}

