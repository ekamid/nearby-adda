process.env.NODE_ENV = "test"; //it changes the environment dev to test

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const config = require("../config/enviroments");

const UserModel = require("../models/User");
const EventModel = require("../models/Event");
const UsersService = require("../modules/users/users.service");
const EventService = require("../modules/users/users.service");

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

describe("testing for Event workflow", () => {
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

  it("User has created an event", async () => {
    try {
      const eventData = {
        name: "Philosofir adda",
        startDate: new Date(Date.now() + 3600000), // 1 hour from now
        endDate: new Date(Date.now() + 7200000), // 2 hours from now
        description: "This is a test event.",
        address: "Rampura Tv Bhavan",
        latitude: 23.76545319531347,
        longitude: 90.4226233932535,
      };

      const response = await chai
        .request(app)
        .post("/v1/events")
        .set("auth-token", token)
        .send(eventData);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property("status", 1);
      expect(response.body.data).to.be.an("object");
      expect(response.body.data).to.have.property("event");
      expect(response.body.data.event).to.have.property("name", eventData.name);
      expect(new Date(response.body.data.event.startDate)).to.eql(
        eventData.startDate
      );
      expect(new Date(response.body.data.event.endDate)).to.eql(
        eventData.endDate
      );
      expect(response.body.data.event).to.have.property(
        "description",
        eventData.description
      );
      expect(response.body.data.event).to.have.property(
        "address",
        eventData.address
      );
      expect(response.body.data.event).to.have.property(
        "latitude",
        eventData.latitude
      );
      expect(response.body.data.event).to.have.property(
        "longitude",
        eventData.longitude
      );
    } catch (err) {
      error = err;
      console.log(err);
    }

    assert.notExists(error);
  });
});
