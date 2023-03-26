const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config/enviroments");

module.exports = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected");
  } catch (error) {
    console.log("Error ============");
    console.log(error);
    process.exit(1);
  }
};
