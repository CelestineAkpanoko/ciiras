import type { PolicyEngine, PolicyContext } from "./contract.js";
import type { Incident } from "../incident/schema.js";
import type { PolicyDecision } from "./decisions.js";

/**
 * CompositePolicyEngine enables layering rules without changing callers.
 */
export class CompositePolicyEngine implements PolicyEngine {
  constructor(private readonly engines: readonly PolicyEngine[]) {}

  evaluate(incident: Incident, ctx: PolicyContext): PolicyDecision {
    let lastAllowDecision: PolicyDecision | undefined;

    for (const engine of this.engines) {
      const decision = engine.evaluate(incident, ctx);

      if (!decision.allow) {
        // Short-circuit on first deny, preserving its details
        return decision;
      }

      // Track the most recent allow decision so we can preserve its details
      lastAllowDecision = decision;
    }

    // If every engine allows, return the last allow decision (or a generic allow if none exist)
    return (
      lastAllowDecision ?? {
        allow: true,
        risk: "low",
        reason: "Allowed by policy.",
      }
    );
  }
}
