const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'slider.js',
        library: 'slider',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

module.exports = (env, argv) => {

    switch (argv.mode) {
        case 'development': return {
            ...config,
            devtool: 'source-map',
            plugins: [
                new HtmlWebpackPlugin({
                    template: './index.ejs'
                })
            ],
        };
        case 'production': return {
            devtool: 'source-map',
            ...config,
        };
    }

};
