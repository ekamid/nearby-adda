const assert = require("assert");
const { expect } = require("chai");
const { add } = require("../server");

describe("Add Function", () => {
  it("Should add 2 numbers together", () => {
    const result = add(1, 2);
    // assert.equal(result, 3);
    expect(result).to.be.eq(1);
  });
});
