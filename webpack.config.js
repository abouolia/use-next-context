const path = require('path');

module.exports = [
  {
    entry: './src/index.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    target: 'web',
    node: {
      __dirname: false,
    },
  },
];
