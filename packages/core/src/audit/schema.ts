import { z } from "zod";
import { EvidenceRefBaseSchema } from "../schemas/evidence.js";

/**
 * Audit evidence references use the base evidence schema.
 * No note field needed in audit events - keep audit trail concise.
 */
export const AuditEvidenceRefSchema = EvidenceRefBaseSchema;

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
