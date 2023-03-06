const mongoose = require("mongoose");

//config file
const { DATABASE_URL } = require("./src/config/enviroments");

const { roleSeeder } = require("./src/seeders/RoleSeeder");
const seeder = process.argv[process.argv.length - 1];

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      switch (seeder) {
        case "RoleSeeder":
          roleSeeder();
          break;
        default:
          console.log("Please provide a valid seeder name");
      }
    }
  })
  .catch((err) => {
    console.error(`App Starting Error: ${err}`);
  });
