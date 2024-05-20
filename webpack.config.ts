import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Configuration, ProgressPlugin } from "webpack";
import "webpack-dev-server";


const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
        {
          test: /\.tsx?$/,
          // loader: path.resolve(__dirname, "loader.ts"),
          use: "ts-loader",
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].css",
      }),
      new Dotenv(),
    ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  devtool: "source-map",
};

export default config;
