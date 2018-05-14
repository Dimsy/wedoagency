var path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack'); 

module.exports = {
	devtool: 'inline-source-map',
	entry: [
    'babel-polyfill',
		'./src/app.js'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	devServer: {
		proxy: [
		  {
		   context: ['/wp-json','/wp-admin'],
			target: 'http://test.wedoagency.ru',
			secure: false,
			changeOrigin: true
		  }
		],
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		},
		historyApiFallback: true
    },
	module: {
	 	loaders: [
	 		{
	 			test: /\.js/,
	 			loaders: ['babel-loader'],
	 			include: path.join(__dirname, 'src')
	 		},
	 		{
	 			test: /\.css/,
	 			loaders: ['style-loader','css-loader'],
	 		},
	 		{
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
         	{
         		loader: 'file-loader',
         		options: {
         			query: {
         				name: 'assets/[name].[ext]'
         			}
         		}
         	},
         	{
       			loader: 'image-webpack-loader',
       			options: {
       				query: {
       					mozjpeg: {
             			progressive: true,
           			},
           			gifsicle: {
           	  		interlaced: true,
           			},
           			optipng: {
           	  		optimizationLevel: 7,
           			}
       				}
       			}
       		}
	 			]
	 		}
	 	]
  }
}
/*
plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin({
        test: /\.js($|\?)/i
    })
]*/