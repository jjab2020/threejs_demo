let mix = require('laravel-mix');
let webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

/*mix.autoload({
 jquery: ['$', 'jQuery', 'window.jQuery'],
});*/

mix.webpackConfig({
  plugins: [
    new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
    }),
  ]
});

mix.js('./src/app.js', './dist/').sass('./src/app.scss', './dist/');
mix.setResourceRoot('../');
