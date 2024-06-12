const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (req, res) => {

  const id =parseInt(req.url.substring(req.url.lastIndexOf('/') + 1));
  console.log(id)

    try {
      let body = await requestBodyparser(req);
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      });
      if (index === -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not Found", message: "Movie not found" })
        );
        res.end();
      } else {
        req.movies[index] = { id, ...body };
        writeToFile(req.movies);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies[index]));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  }
  // } else {
  //   res.writeHead(404, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  // }
// ;
