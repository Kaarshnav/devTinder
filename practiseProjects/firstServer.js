const http = require("http");
//const http = require("node:http");
// same thing, coz it is a ntaive module still you can do without node:
const server = http.createServer(function (req, res) {
  res.end(" hello bhai ");
});
const port = 3000;
server.listen(port, () => {
  console.log(`hello we are listening at ${port}.....`);
});
