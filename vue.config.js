module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/OpenAPI-Viewer/' : '/',
    chainWebpack: config => {
        // Additional Webpack config goes here
    }
}