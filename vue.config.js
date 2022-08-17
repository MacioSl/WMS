const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
})
module.exports = {
    pages: {
        'index': {
            entry: 'src/main.js',
            template:'public/index.html',
            title:'WMS - Products',
        },
        'inbound': {
            entry: 'src/pages/inbound/main.js',
            template:'public/index.html',
            title:'WMS - Inbound',
        },
        'outbound': {
            entry: 'src/pages/outbound/main.js',
            template:'public/index.html',
            title:'WMS - Outbound',
        }
    }
}