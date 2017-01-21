var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        app: './js/main.js',
        vendor: ["jquery", "bootstrap"]
    },
    output: {
        path: './build/',
        publicPath: './build/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            // Export CSS files to a file in the output directory
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', { publicPath: '' }) },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader", { publicPath: '' })
            },
            // Image URL config. Generate data URI's for images smaller than 10,000 bytes
            { test: /\.(png|gif|jpe?g|svg)$/i, loader: 'url?limit=10000' },

            // Image file config. Generate hashed file names to make them easy to cache.
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: 'file?hash=sha512&digest=hex&name=[path][name]-[hash].[ext]'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin("[name].css")
    ]
}