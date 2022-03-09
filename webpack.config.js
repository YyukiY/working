const path = require('path');

module.exports = {
  // ビルド元
  entry: './src/index.js',

  // 出力先
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },

  // モジュール毎の追加
  module: {
    // ファイル毎の仕様設定
    rules: [
      {
        // ファイル名の検知
        test: /\.css/,
        // .cssファイルが以下のルールに従う
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
};
