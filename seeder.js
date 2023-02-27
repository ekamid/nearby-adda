const mongoose = require("mongoose");

//config file
const { PORT, DATABASE_URL } = require("./config");

const { roleSeeder } = require("./seeders/RoleSeeder");
const seeder = process.argv[process.argv.length - 1];

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("connected to db");
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
