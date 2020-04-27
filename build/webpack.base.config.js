const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/html`

module.exports = {
	externals: {
		paths: PATHS
	},

	entry: {
		app: PATHS.src,
	},

	output: {
		filename: `${PATHS.assets}js/[name].[hash].js`,
		path: PATHS.dist,
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			},
		},
	},

	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node-modules/'
		}, {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file-loader",
			options: {
				name: "[name].[ext]"
			}
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {
			test: /\.scss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						config: {
							path: `./postcss.config.js`
						}
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						config: {
							path: `./postcss.config.js`
						}
					}
				}
			]
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[hash].css`,
		}),
		new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/index.html`,
			filename: './index.html',
			inject: true
		}),
		new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/mountain.html`,
			filename: './mountain.html',
			inject: true
		}),
		new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/hike.html`,
			filename: './hike.html',
			inject: true
		}),
		new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/fashion.html`,
			filename: './fashion.html',
			inject: true
		}),
		new CopyWebpackPlugin([{
				from: `${PATHS.src}/${PATHS.assets}img`,
				to: `${PATHS.assets}img`
			},
		]),
	],
}
