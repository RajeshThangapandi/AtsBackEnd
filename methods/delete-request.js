const writeToFile = require("../util/write-to-file");
module.exports = (req, res) => {

 
  const id =parseInt(req.url.substring(req.url.lastIndexOf('/') + 1));
  
    const index = req.movies.findIndex((movie) => {
      console.log(id,movie.id)
      return movie.id === id;
    });
    if (index === -1) {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "applicant not found" })
      );
      res.end();
    } else {
      req.movies.splice(index, 1);
      writeToFile(req.movies);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    }

}
