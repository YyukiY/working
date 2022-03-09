const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ビルド元
  entry: './src/index.js',

  // 出力先
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },

  // モジュール仕様
  module: {
    // ファイル仕様
    rules: [
      {
        // ファイル名の検知
        test: /\.css/,
        // .cssファイルを検知したときの設定
        use: [
          /**
           * ！-- loaderは下から読み込まれる --！
           */
          {
            // 読み込んだstyleを適用する
            // loader: 'style-loader',	// インラインcss
            loader: MiniCssExtractPlugin.loader, // css別ファイル化
          },
          {
            // .cssファイルをjsに読み込む
            loader: 'css-loader',
          },
        ],
      },
    ],
  },

  // プラグイン仕様
  plugins: [
    // cssを別ファイル出力。module.loaderも変更する必要あり
    new MiniCssExtractPlugin(),
    // htmlファイル出力
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
