module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/OpenAPI-Viewer/' : '/',
    configureWebpack: {
        resolve: {
            alias: {
              'vue$': 'vue/dist/vue.esm.js'  // Remove this if you want dont want to include template compiler 
            },
            extensions: ['*', '.js', '.vue', '.json']
        }
    },
    chainWebpack: config => {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
        // Additional Webpack config goes here
    }
}