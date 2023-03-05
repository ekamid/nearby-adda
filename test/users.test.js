process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const config = require("../config/enviroments");

const UserModel = require("../models/User");
const UsersService = require("../modules/users/users.service");

const { app } = require("../index");

chai.use(chaiHttp); // add chai-http to chai

const { assert, expect } = require("chai");

/**
 * The codes inside this block will run before any tests in this file runs,
 * used for test suite initializing!
 */
before(async () => {
  await mongoose.connect(config.DATABASE_URL);
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
  await UserModel.deleteMany();
};

let user, error, token;

describe("testing for User workflow", () => {
  // user related
  it("User creates an account successfully", async () => {
    try {
      const userInDB = await UsersService.createUser({
        name: "Ebrahim Khalil",
        email: "ebrahim@gmail.com",
        username: "ebrahim",
        password: "123123",
      });

      user = userInDB;
    } catch (err) {
      console.log(err);
      error = err;
    }
    assert.notExists(error);
    assert.exists(user);
  });

  it("User has duplicate email", async () => {
    try {
      const userInDB = await UsersService.getUserByEmail("ebrahim@gmail.com");

      user = userInDB;
    } catch (err) {
      console.log(err);
      error = err;
    }
    assert.notExists(error);
    assert.exists(user);
  });

  it("User has duplicate username", async () => {
    try {
      const userInDB = await UsersService.getUserByUsername("ebrahim");
      user = userInDB;
    } catch (err) {
      console.log(err);
      error = err;
    }
    assert.notExists(error);
    assert.exists(user);
  });

  it("Email and password are valid", async () => {
    try {
      const response = await chai.request(app).post("/v1/users/login").send({
        email: "ebrahim@gmail.com",
        password: "123123",
      });

      expect(response).to.have.status(200);
      expect(response.body.data).to.have.property("token");
      token = response.body.data.token;
    } catch (err) {
      error = err;
      console.log(err);
    }

    assert.notExists(error);
  });

  it("Authenticate use by token", async () => {
    try {
      const response = await chai
        .request(app)
        .get("/v1/users/me")
        .set("auth-token", token);

      expect(response).to.have.status(200);
      expect(response.body.data).to.have.property("user");
    } catch (err) {
      error = err;
      console.log(err);
    }

    assert.notExists(error);
  });

  it("Update address", async () => {
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
