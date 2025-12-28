import { z } from "zod";

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
