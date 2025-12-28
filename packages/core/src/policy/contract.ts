import type { Incident } from "../incident/schema.js";
import type { PolicyDecision } from "./decisions.js";

/**
 * PolicyContext describes the *intent* of the system at a given moment.
 * It is used by policy to allow/block behavior.
 */
export type PolicyContext = {
  phase: "detection" | "analysis" | "strategy" | "validation" | "pr";

  /**
   * A summary of a proposed patch/operation (even before it exists).
   * During analysis phase, this may be omitted.
   */
  proposed?: {
    filesChanged: number;
    linesChanged: number;
    createsNewFiles: boolean;
    touchesLockfile: boolean;
    touchesCIConfig: boolean;
  };

  /**
   * Confidence estimate (0..1) produced by analysis/strategy.
   * Not used in Phase 1 logic beyond defining the field.
   */
  confidence?: number;
};

/**
 * PolicyEngine is read-only. It never performs mutations.
 * It only decides whether the system may proceed.
 */
export interface PolicyEngine {
  evaluate(incident: Incident, ctx: PolicyContext): PolicyDecision;
}
