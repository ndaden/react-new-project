import path from 'path';
import webpack from 'webpack';

import HtmlWebPackPlugin from 'html-webpack-plugin';

const HtmlWebPackPluginConfig = new HtmlWebPackPlugin({
    template: path.resolve(__dirname, 'src','index.html'),
    filename : 'index.html',
    inject: 'body'
});
const settings = {
    target: 'web',
    devtool: 'eval-source-map',
    entry : [
        path.resolve(__dirname, 'src/index'),
        'webpack-hot-middleware/client?reload=true'
    ],
    output: {
        path : path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename : 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".json", ".css"]
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            {test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader' },
            {test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
            {test: /\.html$/, loader: 'html-loader' },
            {test: /\.json/, loader: 'json-loader' },
            {test: /\.(mp4|webm)$/, loader: 'url-loader', query: { limit: 10000 } },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    'postcss-loader'
                ] },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
        HtmlWebPackPluginConfig
    ]
};

export default settings;
