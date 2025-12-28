import { describe, it, expect } from "vitest";
import { V0PolicyEngine } from "../src/policy/rules/v0.js";

function baseIncident(code: string): any {
  const now = new Date().toISOString();
  return {
    id: "o/r/runs/1/attempt/1",
    createdAt: now,
    updatedAt: now,
    repo: { owner: "o", name: "r", defaultBranch: "main" },
    source: {
      provider: "github-actions",
      run: {
        runId: 1,
        attempt: 1,
        workflowName: "CI",
        runUrl: "https://example.com/runs/1",
        commitSha: "abc1234",
        ref: "refs/heads/main"
      },
      jobs: []
    },
    failure: {
      summary: "Fail",
      signature: { family: "typescript", code, message: "msg" },
      evidence: []
    },
    state: { status: "new", version: 0 }
  };
}

describe("V0PolicyEngine", () => {
  it("denies unsupported codes", () => {
    const engine = new V0PolicyEngine();
    const d = engine.evaluate(baseIncident("TS9999"), { phase: "analysis" });
    expect(d.allow).toBe(false);
  });

  it("allows supported codes", () => {
    const engine = new V0PolicyEngine();
    const d = engine.evaluate(baseIncident("TS2307"), { phase: "analysis" });
    expect(d.allow).toBe(true);
  });

  it("denies lockfile edits", () => {
    const engine = new V0PolicyEngine();
    const d = engine.evaluate(baseIncident("TS2307"), {
      phase: "strategy",
      proposed: {
        filesChanged: 1,
        linesChanged: 2,
        createsNewFiles: false,
        touchesLockfile: true,
        touchesCIConfig: false
      },
      confidence: 0.9
    });
    expect(d.allow).toBe(false);
  });

  it("denies too-large diffs", () => {
    const engine = new V0PolicyEngine();
    const d = engine.evaluate(baseIncident("TS2345"), {
      phase: "strategy",
      proposed: {
        filesChanged: 10,
        linesChanged: 2,
        createsNewFiles: false,
        touchesLockfile: false,
        touchesCIConfig: false
      },
      confidence: 0.9
    });
    expect(d.allow).toBe(false);
  });
});
