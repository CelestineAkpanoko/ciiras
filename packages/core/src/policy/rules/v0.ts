import type { PolicyEngine, PolicyContext } from "../contract.js";
import type { Incident } from "../../incident/schema.js";
import type { PolicyDecision } from "../decisions.js";
import { isSupportedFailureCode } from "../../incident/supported.js";

/**
 * v0 policy: conservative by default.
 * It encodes non-negotiable safety boundaries.
 */
export class V0PolicyEngine implements PolicyEngine {
  evaluate(incident: Incident, ctx: PolicyContext): PolicyDecision {
    const code = incident.failure.signature.code;

    // 1) Must be in supported v0 failures list
    if (code !== "UNKNOWN" && !isSupportedFailureCode(code)) {
      return { allow: false, risk: "forbidden", reason: `Unsupported failure code: ${code}` };
    }

    // 2) If a proposal exists, enforce forbidden edits
    if (ctx.proposed?.touchesLockfile) {
      return { allow: false, risk: "forbidden", reason: "Lockfile edits are forbidden in v0." };
    }
    if (ctx.proposed?.touchesCIConfig) {
      return { allow: false, risk: "forbidden", reason: "CI/workflow config edits are forbidden in v0." };
    }

    // 3) Conservative patch constraints (future-proof)
    const constraints = {
      maxFilesChanged: 3,
      maxLinesChanged: 60,
      allowNewFiles: false
    };

    if (ctx.proposed) {
      if (ctx.proposed.createsNewFiles && constraints.allowNewFiles === false) {
        return { allow: false, risk: "forbidden", reason: "Creating new files is forbidden in v0." };
      }
      if (ctx.proposed.filesChanged > (constraints.maxFilesChanged ?? 0)) {
        return { allow: false, risk: "forbidden", reason: "Too many files changed for v0 constraints." };
      }
      if (ctx.proposed.linesChanged > (constraints.maxLinesChanged ?? 0)) {
        return { allow: false, risk: "forbidden", reason: "Too many lines changed for v0 constraints." };
      }
    }

    return {
      allow: true,
      risk: "low",
      reason: "Allowed under v0 safety constraints.",
      constraints
    };
  }
}
