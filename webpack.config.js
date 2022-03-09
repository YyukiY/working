const path = require('path');

module.exports = {
  // ビルド元
  entry: './src/index.js',

  // 出力先
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
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
          /**
           * ！-- loaderは下から読み込まれる --！
           */
          {
            // 読み込んだstyleを適用する
            loader: 'style-loader',
          },
          {
            // .cssファイルをjsに読み込む
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
};
