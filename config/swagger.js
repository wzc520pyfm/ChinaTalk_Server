let swaggerOptions;

swaggerOptions = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:" + process.env.PORT || "3000", // 模拟请求时的ip地址
    basePath: "/",
    produces: ["application/json", "application/xml"],
    accepts: ['application/x-www-form-urlencoded', 'application/json'],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  route: {
    url: "/swagger",
    docs: "/swagger.json", //swagger文件 api
  },
  basedir: __dirname, //app absolute path
  files: ["../controller/*.js"], //Path to the API handle folder
};

module.exports = swaggerOptions
