const webpack = require('webpack');
require('babel-polyfill');

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './js/index.js'],
    output: {filename: 'main.min.js'},
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.js$/, loader: 'eslint-loader', enforce: 'pre', exclude: /node_modules/},
            {test: /\.js$/, loader: 'babel-loader', query: {babelrc: false, presets: ['es2015']}, exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {warnings: false},
            outpue: {comments: false},
            sourceMap: true
        })
    ]
}