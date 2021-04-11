const path = require('path');

module.exports = {
    entry: ['./src/index.ts'],
    mode: 'development',
    devtool: "inline-source-map",
    watch: false,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};