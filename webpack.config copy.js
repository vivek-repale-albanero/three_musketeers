const path = require("path");
const { merge } = require("webpack-merge");
const postcssPresetEnv = require("postcss-preset-env");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (webpackConfigEnv, argv) =>
  merge({
    entry: path.resolve(__dirname, "src/index.js"),
    devtool: "hidden-source-map",
    output: {
      path: path.resolve(path.resolve(__dirname), "dist"),
      chunkFilename: "three-musketeer/[name].js",
      filename: "three-musketeer.js",
    },
    externals: [
      {
        react: "react",
        "react-dom": "react-dom",
        "react-router-dom": "react-router-dom",
        "@platform/primary-table": "@platform/primary-table",
        "@platform/service-ui-libraries": "@platform/service-ui-libraries",
      },
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [postcssPresetEnv(), require("autoprefixer")],
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [postcssPresetEnv(), require("autoprefixer")],
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          type: "javascript/auto",
          use: {
            loader: "url-loader",
            options: {
              name: "[hash].[ext]",
              outputPath: "datalake-module/assets",
              esModule: false,
              limit: 5000,
            },
          },
        },
      ],
    },
    optimization: {
      minimize: argv.mode === "production",
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new CompressionPlugin(),
      new ESLintPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        publicPath: "/",
      }),
    ],
    mode: "development",
    devServer: {
      historyApiFallback: true,
    },
  });
