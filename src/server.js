var static = require("node-static");
var history = require('connect-history-api-fallback');

var file = new static.Server();
require("http")
  .createServer(function(request, response) {
    request
      .addListener("end", function() {
        file.serve(request, response);
      })
      .resume();
  })
  .use(history())
  .listen(process.env.PORT || 3000);
