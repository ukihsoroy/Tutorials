const proxy = require('http-proxy-middleware');
const https = require('https');
const tunnel = require('tunnel');
const customConfig = require(process.env.CURR_DIR + '/config');

const url = customConfig.url

let agent = new https.Agent({
    rejectUnauthorized: false
});

if(url.includes('huawei')){
    agent = tunnel.httpsOverHttp({
        proxy: {
            host: 'proxy.huawei.com',
            port: 8080,
        }
    }) 
}

module.exports = function expressMiddleware(router) {
    router.use(['/baas', '/service','/u-route'], proxy({
        target: url,
        changeOrigin: true,
        agent: agent
    }))
}