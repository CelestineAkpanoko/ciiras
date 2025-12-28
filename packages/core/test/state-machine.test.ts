import { describe, it, expect } from "vitest";
import { canTransition, assertTransition } from "../src/state-machine/transitions.js";

describe("state machine transitions", () => {
  it("allows new -> queued", () => {
    expect(canTransition("new", "queued")).toBe(true);
  });

  it("blocks done-like transitions (closed_noop is terminal)", () => {
    expect(canTransition("closed_noop", "queued")).toBe(false);
  });

  it("throws on invalid transitions", () => {
    expect(() => assertTransition("new", "validating")).toThrow(/Invalid transition/);
  });
});
