import { describe, it, expect } from "vitest";
import { IncidentSchema, buildIncidentId } from "../src/incident/schema.js";

describe("IncidentSchema", () => {
  it("parses a minimal GitHub Actions incident", () => {
    const now = new Date().toISOString();
    const incident = IncidentSchema.parse({
      id: buildIncidentId({ owner: "o", repo: "r", runId: 123, attempt: 1 }),
      createdAt: now,
      updatedAt: now,
      repo: { owner: "o", name: "r", defaultBranch: "main" },
      source: {
        provider: "github-actions",
        run: {
          runId: 123,
          attempt: 1,
          workflowName: "CI",
          runUrl: "https://example.com/runs/123",
          commitSha: "abc1234def",
          ref: "refs/heads/main"
        },
        jobs: []
      },
      failure: {
        summary: "TypeScript compilation failed",
        signature: { family: "typescript", code: "TS2307", message: "Cannot find module 'x'." },
        evidence: []
      },
      state: { status: "new", version: 0 }
    });

    expect(incident.source.provider).toBe("github-actions");
    expect(incident.failure.signature.code).toBe("TS2307");
  });
});
