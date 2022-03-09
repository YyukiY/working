const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// ツールの中の{xxx}クラスを読み込む
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // ビルド元
  entry: './src/javascripts/main.js',

  // 出力先
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './javascript/main.js', //ファイルパス
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
    new MiniCssExtractPlugin({
      filename: './stylesheets/main.css', // build後のcssファイルパス
    }),
    // htmlファイル出力
    new HtmlWebpackPlugin({
      template: './src/templates/index.html', // テンプレートファイル指定
    }),
    // dist内を一回削除し、buildが走る
    new CleanWebpackPlugin(),
  ],
};
