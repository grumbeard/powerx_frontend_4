const {
  createWebpackDevConfig,
  createWebpackProdConfig,
} = require("@craco/craco");
const cracoConfig = require("./craco.config");
const path = require("path");

/**
 * @type {import('react-styleguidist').StyleguidistConfig}
 */
module.exports = {
  require: [path.resolve(__dirname, "src/index.css")],
  components: 'src/{components,domains/**/components}/**/*.jsx',
  ignore: ['src/components/field-context.js'],
  webpackConfig:
    process.env.NODE_ENV === "production"
      ? createWebpackProdConfig(cracoConfig)
      : createWebpackDevConfig(cracoConfig),
};
