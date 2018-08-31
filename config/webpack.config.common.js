'use strict';

const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const webpack = require('webpack');

module.exports = {
    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
        ),
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
        alias: {
            "Actions": path.resolve(__dirname, "../src/actions/"),
            "Assets": path.resolve(__dirname, "../src/assets/"),
            "Components": path.resolve(__dirname, "../src/components/"),
            "Constants": path.resolve(__dirname, "../src/constants/"),
            "Containers": path.resolve(__dirname, "../src/containers/"),
            "Reducers": path.resolve(__dirname, "../src/reducers/"),
            "Services": path.resolve(__dirname, "../src/services/"),
            "Utilities": path.resolve(__dirname, "../src/utilities/"),
            "Src": path.resolve(__dirname, "../src/")
        },
        plugins: [
            new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            // _: path.resolve(__dirname,"./../src/assets/scripts/*.js"),
            // DESKTOP: path.resolve(__dirname,"./../src/assets/scripts/*.js")
        }),
    ]
}