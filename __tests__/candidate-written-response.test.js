const fs = require("fs");

describe("candidate written response", () => {
  it("should be modified", done => {
    const originalLength = 435;
    fs.readFile("./candidate-written-response.md", (err, data) => {
      expect(data.length).toBeGreaterThan(originalLength);
      done();
    });
  });
});
