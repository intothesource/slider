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
    plugins: [
        new HtmlWebpackPlugin({
            template: './examples/index.ejs',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './examples/one.ejs',
            filename: 'one.html',
        }),
        new HtmlWebpackPlugin({
            template: './examples/two.ejs',
            filename: 'two.html',
        })
    ],
};

module.exports = (env, argv) => {

    switch (argv.mode) {
        case 'development': return {
            ...config,
            devtool: 'source-map',
        };
        case 'production': return {
            devtool: 'source-map',
            ...config,
        };
    }

};
