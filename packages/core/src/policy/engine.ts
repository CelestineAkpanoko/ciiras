import type { PolicyEngine, PolicyContext } from "./contract.js";
import type { Incident } from "../incident/schema.js";
import type { PolicyDecision } from "./decisions.js";

/**
 * CompositePolicyEngine enables layering rules without changing callers.
 */
export class CompositePolicyEngine implements PolicyEngine {
  constructor(private readonly engines: readonly PolicyEngine[]) {}

  evaluate(incident: Incident, ctx: PolicyContext): PolicyDecision {
    for (const engine of this.engines) {
      const decision = engine.evaluate(incident, ctx);
      if (!decision.allow) return decision;
    }
    // If every engine allows, return the last allow (or a generic allow)
    return { allow: true, risk: "low", reason: "Allowed by policy." };
  }
}
