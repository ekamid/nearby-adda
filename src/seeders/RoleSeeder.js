const RoleModel = require("../models/Role");
const { ROLE_LIST } = require("../config/roleList");

const roleSeeder = async () => {
  try {
    console.log("Clearing roles collections..");
    let deleted = await RoleModel.deleteMany({});
    if (deleted.acknowledged) {
      console.log("Roles collection cleared");

      console.log("Seeding roles started....");
      let roles = await RoleModel.insertMany(ROLE_LIST);

      if (roles.length === ROLE_LIST.length) {
        console.log("Roles seeded successfully");

        process.exit(1);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  roleSeeder,
};
