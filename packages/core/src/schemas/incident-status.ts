import { z } from "zod";

/**
 * Canonical incident states used by the orchestrator.
 * (These are aligned with the state machine diagram.)
 *
 * Single source of truth for incident status values to prevent drift
 * between the incident model and transition logic.
 */
export const IncidentStatusSchema = z.enum([
  "new",
  "queued",
  "acquiring_logs",
  "analyzing",
  "strategizing",
  "validating",
  "pr_opened",
  "commented",
  "closed_noop",
  "needs_human",
  "failed"
]);

export type IncidentStatus = z.infer<typeof IncidentStatusSchema>;
