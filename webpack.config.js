const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// ツールの中の{xxx}クラスを読み込む
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');

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
      {
        // 画像ハンドリング
        test: /\.(png|jpg)/,
        type: 'asset/resource', // webpack5から使用可能
        generator: {
          filename: 'images/[name][ext]', // [ext] = . + 拡張子
        },
        use: [
          /*	sebpack5から↑assetで対応可能
          {
            // htmlファイルに画像urlをloadする。
            // loader: 'url-loader',	// 容量もコードも多くなるので非推奨
            loader: 'file-loader', // 推奨 : dist画像ファイルへ
            options: {
              esModule: false,
              name: 'images/[name].[ext]', //ファイルネームそのまま
            },
          },
					*/
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
