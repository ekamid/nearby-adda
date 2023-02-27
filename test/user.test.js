process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../models/User");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach((done) => {
    // empty the users collections of db
    User.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET user", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe("/POST User", () => {
    it("it should not POST a user without email, name, username, password field. eamil and username field must be unique. Password length must be greater than equal 8", (done) => {
      let user = {
        email: "ebrahim@gmail.com",
        username: "ekamid",
        name: "Ebrahim Khalil",
        password: "12341234",
      };
      chai
        .request(server)
        .post("/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("email");
          res.body.errors.should.have.property("username");
          res.body.errors.should.have.property("name");
          res.body.errors.should.have.property("password");
          //   res.body.errors.pages.should.have.property("kind").eql("required");
          done();
        });
    });
  });
});
