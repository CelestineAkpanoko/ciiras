import { z } from "zod";
import { IncidentStatusSchema } from "../schemas/incident-status.js";
import { EvidencePointerSchema } from "../schemas/evidence.js";
import { SUPPORTED_FAILURE_CODES } from "./supported.js";

export type EvidencePointer = z.infer<typeof EvidencePointerSchema>;

export const RepoRefSchema = z.object({
  owner: z.string().min(1),
  name: z.string().min(1),
  defaultBranch: z.string().min(1).default("main")
});

export type RepoRef = z.infer<typeof RepoRefSchema>;

export const ActionsRunRefSchema = z.object({
  runId: z.number().int().positive(),
  attempt: z.number().int().positive().default(1),
  workflowName: z.string().min(1),
  runUrl: z.string().url(),
  commitSha: z.string().min(7),
  ref: z.string().min(1) // refs/heads/main OR refs/pull/123/merge
});

export type ActionsRunRef = z.infer<typeof ActionsRunRefSchema>;

export const ActionsJobRefSchema = z.object({
  jobId: z.number().int().positive(),
  name: z.string().min(1),
  jobUrl: z.string().url(),
  conclusion: z
    .enum(["success", "failure", "cancelled", "skipped", "neutral", "timed_out", "action_required"])
    .optional()
});

export type ActionsJobRef = z.infer<typeof ActionsJobRefSchema>;

/**
 * The normalized failure signature is the machine-readable representation of "what failed".
 * It should be derivable from logs/annotations deterministically.
 */
export const FailureSignatureSchema = z.object({
  family: z.enum(["typescript", "nextjs", "unknown"]).default("unknown"),
  code: z.enum(["UNKNOWN", ...SUPPORTED_FAILURE_CODES] as const).default("UNKNOWN"),
  message: z.string().min(1),

  // optional location when known
  filePath: z.string().optional(),
  line: z.number().int().positive().optional(),
  column: z.number().int().positive().optional()
});

export type FailureSignature = z.infer<typeof FailureSignatureSchema>;

export type IncidentStatus = z.infer<typeof IncidentStatusSchema>;

export const IncidentStateSchema = z.object({
  status: IncidentStatusSchema,
  version: z.number().int().nonnegative().default(0),
  lastError: z.string().optional()
});

export type IncidentState = z.infer<typeof IncidentStateSchema>;

/**
 * Canonical Incident record.
 *
 * Invariants:
 * - One incident per workflow run attempt
 * - Stable incident id: should be derived (repo + runId + attempt)
 * - Evidence stored as pointers, not embedded content
 */
export const IncidentSchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  repo: RepoRefSchema,

  source: z.object({
    provider: z.literal("github-actions"),
    installationId: z.number().int().positive().optional(), // GitHub App installation id
    run: ActionsRunRefSchema,
    jobs: z.array(ActionsJobRefSchema).default([])
  }),

  failure: z.object({
    summary: z.string().min(1),
    signature: FailureSignatureSchema,
    evidence: z.array(EvidencePointerSchema).default([])
  }),

  state: IncidentStateSchema,

  resolution: z
    .object({
      prNumber: z.number().int().positive().optional(),
      prUrl: z.string().url().optional(),
      branch: z.string().min(1).optional(),
      confidence: z.number().min(0).max(1).optional()
    })
    .optional()
});

export type Incident = z.infer<typeof IncidentSchema>;

/**
 * Utility: deterministic incident id from run data
 */
export function buildIncidentId(input: {
  owner: string;
  repo: string;
  runId: number;
  attempt: number;
}): string {
  return `${input.owner}/${input.repo}/runs/${input.runId}/attempt/${input.attempt}`;
}
