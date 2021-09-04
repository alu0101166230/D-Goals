import * as mocha from "mocha";
import * as chai from "chai";
const expect = chai.expect
import * as example from '../src/mocha-test-example';

const add = example.add

describe("add function tests", () => {
  it("add(1, 8) returns value 9", () => {
    expect(add(1, 8)).to.be.equal(9);
  });

  it("add(-1, 8) returns value 7", () => {
    expect(add(-1, 8)).to.be.equal(7);
  });
});