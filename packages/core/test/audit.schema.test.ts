import { describe, it, expect } from "vitest";
import { AuditEventSchema } from "../src/audit/schema.js";

describe("AuditEventSchema", () => {
  it("parses an audit event with evidence pointers", () => {
    const e = AuditEventSchema.parse({
      at: new Date().toISOString(),
      incidentId: "o/r/runs/123/attempt/1",
      level: "info",
      stage: "analysis",
      action: "classify_failure",
      message: "Classified TS2307 from log span",
      meta: { code: "TS2307" },
      evidence: [{ kind: "run_log", uri: "https://example.com/runs/123/logs" }]
    });

    expect(e.action).toBe("classify_failure");
    expect(e.evidence.length).toBe(1);
  });
});
