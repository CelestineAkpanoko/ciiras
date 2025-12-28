import { z } from "zod";

export const AuditEvidenceRefSchema = z.object({
  kind: z.enum(["run_log", "job_log", "annotation", "file", "command_output", "artifact"]),
  uri: z.string().min(1),
  sha256: z.string().regex(/^[a-f0-9]{64}$/).optional()
});

export const AuditEventSchema = z.object({
  at: z.string().datetime(),
  incidentId: z.string().min(1),

  level: z.enum(["debug", "info", "warn", "error"]),
  stage: z.enum(["detection", "log_acquisition", "analysis", "strategy", "validation", "pr", "policy", "system"]),

  /**
   * action should be stable and enumerable over time
   * examples: "create_incident", "classify_failure", "policy_decision"
   */
  action: z.string().min(1),

  /**
   * human-readable message; keep short and meaningful
   */
  message: z.string().min(1),

  /**
   * structured metadata. Must remain small.
   * Avoid dumping raw logs here.
   */
  meta: z.record(z.string(), z.unknown()).default({}),

  /**
   * Evidence pointers supporting the action/decision.
   * "No hallucinations": decisions must cite evidence where applicable.
   */
  evidence: z.array(AuditEvidenceRefSchema).default([])
});

export type AuditEvent = z.infer<typeof AuditEventSchema>;
