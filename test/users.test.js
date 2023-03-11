process.env.NODE_ENV = "test"; //it changes the environment dev to test

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const config = require("../src/config/enviroments");

const UserModel = require("../src/models/User");
const EventModel = require("../src/models/Event");
const UsersService = require("../src/modules/users/users.service");

const { app } = require("../index");

chai.use(chaiHttp); // add chai-http to chai

const { assert, expect } = require("chai");

/**
 * The codes inside this block will run before any tests in this file runs,
 * used for test suite initializing!
 */
before(async () => {
  // await mongoose.connect(config.DATABASE_URL);
  await cleanup();
});

/**
 * The codes inside this block will be executed after all the tests in this file runs,
 * used for database cleanup!
 */
after(async () => {
  await cleanup();
  await mongoose.connection.close();
  process.exit();
});

var cleanup = async () => {
  await EventModel.deleteMany();
  await UserModel.deleteMany();
};

let user, error, token;

describe("testing for User workflow", () => {
  // user related
  it("Should create a new user", async () => {
    try {
      const newUser = await UsersService.createUser({
        name: "Ebrahim Khalil",
        email: "ebrahim@gmail.com",
        username: "ebrahim",
        password: "123123",
      });

      user = newUser;
    } catch (err) {
      console.log(err);
      error = err;
    }
    assert.notExists(error);
    assert.exists(user);
  });

  it("Should throw duplicate error", async () => {
    try {
      const newUser = await UsersService.createUser({
        name: "Ebrahim Khalil",
        email: "ebrahim@gmail.com",
        username: "ebrahim",
        password: "123123",
      });

      user = newUser;
    } catch (err) {
      error = err;
    }
    assert.exists(error);
  });

  it("Should successfully logged in and return a token", async () => {
    try {
      const response = await chai.request(app).post("/v1/users/login").send({
        email: "ebrahim@gmail.com",
        password: "123123",
      });
      console.log(response.body.data);
      console.log(response.body.data.token);

      expect(response.body).to.have.property("status", 200);
      expect(response.body.data).to.have.property("token");
      token = response.body.data.token;
    } catch (err) {
      error = err;
    }
  });

  it("Should authenticate use by token", async () => {
    try {
      const response = await chai
        .request(app)
        .get("/v1/users/me")
        .set("auth-token", token);

      expect(response).to.have.status(200);
      expect(response.body.data).to.have.property("user");
    } catch (err) {
      error = err;
    }

    assert.notExists(error);
  });

  it("Should update address", async () => {
    try {
      const response = await chai
        .request(app)
        .post("/v1/users/update-address")
        .set("auth-token", token)
        .send({
          address: "Rampura Tv Bhavan",
          latitude: "23.76545319531347",
          longitude: "90.4226233932535",
        });

      expect(response).to.have.status(200);
      expect(response.body).to.have.property("status", 1);
    } catch (err) {
      error = err;
      console.log(err);
    }

    assert.notExists(error);
  });
});
