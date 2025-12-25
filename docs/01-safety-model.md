# Safety Model

CIIRAS prioritizes correctness and trust over automation breadth.

## Invariants
- No direct pushes to protected branches
- Validation required before PR creation
- All write actions are policy-gated
- “Do nothing” is a valid outcome

## Default guardrails
- Max files changed: 5
- Max lines changed: configurable
- Forbidden paths:
  - `.github/workflows/**`
  - `infra/**`
  - secrets or credentials directories
- Forbidden actions:
  - disabling compiler or CI checks
  - skipping validation steps

## Degradation behavior
When confidence is low or tools are unavailable, CIIRAS degrades to:
- comment-only diagnosis, or
- no action

Safety failures always degrade, never escalate.
