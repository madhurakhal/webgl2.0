const path = require('path');

module.exports = {
    entry: './src/index.ts',
    watch: true,
    mode: 'development',
    watchOptions: {
        ignored: ['**/node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
            test: /\.(glsl|vs|fs)$/,
            loader: 'ts-shader-loader'
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };