const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { "@disabled-color": "#f9f7f7" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
