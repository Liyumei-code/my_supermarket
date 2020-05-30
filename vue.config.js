module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'common':'@/common',
        'network':'@/network'
      }
    }
  },
}
// 基本设置在这里
// /node_modules/@vue/cli-service/lib/config/base.js