import * as mocha from "mocha";
var expect = require('expect');
// import { expect } from "chai";
import { add } from "../src/mocha-test-example";

describe("add function tests", () => {
  it("add(1, 8) returns value 9", () => {
    expect(add(1, 8)).to.be.equal(9);
  });

  it("add(-1, 8) returns value 7", () => {
    expect(add(-1, 8)).to.be.equal(7);
  });

  it("add(1.2, 3.5) returns value 4.7", () => {
    expect(add(1.2, 3.5)).to.be.equal(4.7);
  });

  it("Not to be", () => {
    expect(add(5, 4)).to.be.not.equal(8);
  });
});