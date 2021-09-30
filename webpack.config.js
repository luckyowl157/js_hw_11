let path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('babel-polyfill');
module.exports = {
    // entry: "./src/index.js",
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'script.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },

            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                ],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                    "sass-loader"
                ],
            },
            { test: /\.hbs$/, loader: "handlebars-loader" },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "./src/styles.css"}),
        new HtmlWebpackPlugin({template: "./src/index.html"}),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    },

    devServer: {
        open: true,
    }
};