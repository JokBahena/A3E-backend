const { app } = require("./config/express");

//Connect to database
const db = require("./utils/mongodb");

//Start server
const main = () => {
  app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
};

//Call main function
main();
