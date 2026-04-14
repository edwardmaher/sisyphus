import { main } from "../../src/index";

describe("main entry point", () => {
  it("exports main as a function", () => {
    expect(typeof main).toBe("function");
  });

  it("main() returns a Promise", () => {
    const result = main();
    expect(result).toBeInstanceOf(Promise);
    return result;
  });
});
