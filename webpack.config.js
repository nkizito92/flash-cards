const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const CONFIG = {
    public: "./public/index.html",
    cssEntry: './src/App.css',
    favicon: './public/favicon.ico',
    bundle: 'index.bundle.js'
}
module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: CONFIG.bundle,
        publicPath: '/'
    },
    mode: 'development',
    devServer: {
        port: 3010,
        historyApiFallback: true,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|json)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
                }
            },

            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                exclude: /node_modules/,
                use: ['file-loader?name[name].[ext]']
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [

        // new CopyWebPackPlugin({
        //     patterns: [
        //         { from: path.resolve(CONFIG.public) },
        //     ]
        // }),
        new MiniCssExtractPlugin(),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
        })
    ],

}