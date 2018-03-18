const
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    isProd = process.env.NODE_ENV === 'production',
    options = {
        entry: './src/js/app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/app.js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader', 'sass-loader'],
                        publicPath: '../'
                    })
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'pug-loader',
                            options: {
                                pretty: isProd
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                outputPath: 'img/',
                                context: './src/img'
                            }
                        },
                        'image-webpack-loader?bypassOnDebug'
                    ]
                },
                {
                    test: /\.(woff2?|eot|ttf)$/,
                    use: 'file-loader?name=fonts/[name].[ext]'
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            hot: true,
            stats: 'errors-only',
            publicPath: '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'Index page',
                minify: false,
                template: './src/index.pug',
                xhtml: true
            }),
            new ExtractTextWebpackPlugin({
                filename: 'css/style.css',
                disable: !isProd
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: { safe: true }
            })
        ]
};

module.exports = options;
