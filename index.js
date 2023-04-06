const app = require("./app");
const db = require("./src/models/index");
const { port } = require("./src/configs/config");

db.sync()
  .then(() => {
    console.log("Database Connected");

    app.listen(port);
    console.log("Server started on port 3000");
  })
  .catch((err) => {
    throw err;
  });
