import type { IncidentStatus } from "./schema.js";

const allowed: Record<IncidentStatus, readonly IncidentStatus[]> = {
  new: ["queued", "failed"],
  queued: ["acquiring_logs", "failed"],
  acquiring_logs: ["analyzing", "needs_human", "failed"],
  analyzing: ["strategizing", "needs_human", "failed"],
  strategizing: ["validating", "commented", "needs_human", "failed"],
  validating: ["pr_opened", "commented", "needs_human", "failed"],
  pr_opened: ["closed_noop", "needs_human", "failed"],
  commented: ["closed_noop", "needs_human", "failed"],
  closed_noop: [],
  needs_human: ["queued", "failed"],
  failed: []
};

export function canTransition(from: IncidentStatus, to: IncidentStatus): boolean {
  return allowed[from].includes(to);
}

export function assertTransition(from: IncidentStatus, to: IncidentStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid transition: ${from} -> ${to}`);
  }
}
