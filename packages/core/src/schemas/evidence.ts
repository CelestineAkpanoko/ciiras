import { z } from "zod";

/**
 * Base evidence reference schema.
 * 
 * We store *pointers* to evidence, not raw logs.
 * This keeps records small and prevents log/secret spillage.
 * Evidence pointers can reference GitHub URLs, artifact URLs, or sandbox paths.
 */
export const EvidenceRefBaseSchema = z.object({
  kind: z.enum(["run_log", "job_log", "annotation", "file", "command_output", "artifact"]),
  uri: z.string().min(1), // URL or sandbox-relative path, depending on phase
  sha256: z.string().regex(/^[a-f0-9]{64}$/).optional()
});

/**
 * Extended evidence pointer schema with optional note field.
 * Used in incident records where additional context may be helpful.
 */
export const EvidencePointerSchema = EvidenceRefBaseSchema.extend({
  note: z.string().max(500).optional()
});

export type EvidencePointer = z.infer<typeof EvidencePointerSchema>;
