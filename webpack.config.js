var Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    .addEntry('another', './assets/js/components/another.js')
    .addEntry('home', './assets/js/components/home.js')
    .addStyleEntry('standalone','./assets/css/standalone.scss') // This adds only CSS entry without JS

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    // Modules are shared across application
    // .enableSingleRuntimeChunk()
    .disableSingleRuntimeChunk()
    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild() // This cleans the public directory at every build
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    // Use a polyfill to make all new features available in older browsers
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    // yarn add sass-loader@^7.0.1 node-sass --dev
    .enableSassLoader()

    // 1. enables PostCSS that means that the CSS code is converted to work with older browsers
    // 2. add post-css loader package
    // 3. yarn add postcss-loader@^3.0.0 --dev
    // 4. In order to use postcss we need to create some config file
    // module.exports = {
    //   plugins: {
    //     'autoprefixer': {},
    //   }
    // }
    // 5. yarn add autoprefixer --dev
    // 6. CONFIG
    //  "browserslist": [
    //         "> .05%"
    //   ]
    // We can config thw browser list to take data from analytics as well browserslist-ga
    // 7. Anytime you change the browserslist config you should clear babel cache
    // rm -rf node_modules/.cache/babel-loader
    .enablePostCssLoader()

    // Copy files from directory out of public
    // We don't need to keep images or other assets in public directory
    // Includes a hash every time the file changes
    .copyFiles({
        from: './assets/images',
        to: 'images/[path][name].[hash:8].[ext]',
    })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    //.enableReactPreset()
    //.addEntry('admin', './assets/js/admin.js')
;

module.exports = Encore.getWebpackConfig();
