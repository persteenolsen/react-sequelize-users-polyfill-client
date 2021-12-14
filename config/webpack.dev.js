const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const common = require('./webpack.common.js')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
  //devtool: false,
  
  //NOTE: 12-12-2021: Maybe not needed to support IE 11 because of the use of Browserslist in package.json combined 
  // with core-js3 - babel@preset-ent - usebuiltin: usage
  // The npm package query-string NEEDS to be version 5 insted of 6 to support IE 11
  // Enable: It is possible testing in IE 11, but reload / replacement will break due to a bug in webpack 5 !
  // Disable: It is possible to use hot relad / replacement but not using IE 11 !
  //target: ['web', 'es5'], 

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  
  // Note: Placed to webpack.common.js while needed both in dev + prod ! 
  /* externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }, */

  plugins: [
    
	// Note: Only update what has changed on hot reload 
	// Require the statement "module.hot.accept();" in the root index.jsx !
    new webpack.HotModuleReplacementPlugin(),
	
	new FriendlyErrorsPlugin()
  ],
})
