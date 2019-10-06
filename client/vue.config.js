// vue.config.js
const path = require('path');

const { loadEnv } = require('vue-cli-plugin-apollo/utils/load-env');

const env = loadEnv([path.resolve(__dirname, '.env.local')]);

console.log('line 7: env', env);

module.exports = {
  // options...
  devServer: {
    disableHostCheck: true,
    public: env.VUE_APP_HOST || 'localhost:8080',
  },
};
