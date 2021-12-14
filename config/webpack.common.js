const pathtoresolve = require('path');
const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
	
  // Where webpack looks to start building the bundle and include polyfill
  entry: [ 'whatwg-fetch', paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
    
    
  resolve: {
        		 
		mainFiles: ['index', 'Index'],
        extensions: ['.js', '.jsx'],
        alias: {
            '@': pathtoresolve.resolve(__dirname, '../src/'),
			'images': pathtoresolve.resolve(__dirname, '../src/assets/images/'),
		    'styles': pathtoresolve.resolve(__dirname, '../src/assets/styles/'),
        }
    },
    // Note: Need to be here instead of webpack.dev.js while needed both in dev + prod ! 
    externals: {
        
		// global app config object
        config: JSON.stringify({
          			
		// NOTE: FOR PRODUCTION ON AZURE!!!
         apiUrl: 'https://pso-node-react.azurewebsites.net' 
		 
		// REAL LOCAL BACKEND - FOR TESTING
        // apiUrl:'http://localhost:443'
        
		// WITH FAKE BACKEND
		// apiUrl:'http://localhost:4000' 
		
        })
    }, 
	
  // Customize the webpack build process
  plugins: [
    
	
	//new FriendlyErrorsPlugin(),
    	
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/assets/images/favicon.png',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
		  test: /\.js$/, 
		  exclude: /node_modules/, 
		  use: ['babel-loader']},
	  
	   {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },

      // Images: Copy image files to build folder
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

      // Fonts and SVGs: Inline files
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
    ],
  },
}
