# Contributing to CIIRAS

Thank you for your interest in contributing to CIIRAS.

CIIRAS is a safety-first, assurance-driven system. Contributions are welcome, but correctness, clarity, and restraint matter more than feature velocity.

---

## Guiding Principles

When contributing, please keep these principles in mind:

1. **Safety over automation**
   - CIIRAS should prefer “do nothing” over unsafe behavior.

2. **Evidence before action**
   - New logic must be grounded in observable CI evidence.

3. **Determinism over heuristics**
   - Behavior should be reproducible and testable.

4. **Policy over cleverness**
   - No contribution should bypass or weaken policy enforcement.

---

## Ways to Contribute

You can help by:
- Improving documentation or diagrams
- Adding tests or fixtures
- Enhancing log normalization or evidence extraction
- Proposing new strategy frameworks (not fixes yet)
- Improving auditability or observability
- Reviewing issues and PRs

Please avoid submitting:
- Broad auto-fix logic without validation
- Changes that increase autonomy without safeguards
- Language- or framework-specific fixes without a generic strategy framework

---

## Development Setup (High Level)

1. Clone the repository
2. Install dependencies (Node.js + package manager)
3. Run tests
4. Use fixtures in `fixtures/` for local replay

Detailed setup instructions will evolve as the project matures.

---

## Pull Request Guidelines

All PRs should:
- Be scoped and focused
- Include tests where applicable
- Explain *why* a change is safe
- Avoid breaking policy invariants

PRs that introduce write behavior (filesystem or GitHub) will receive extra scrutiny.

---

## Issue Reporting

When opening an issue:
- Describe the problem clearly
- Include logs or minimal reproduction if possible
- Explain expected vs actual behavior

For security issues, see `SECURITY.md`.

---

## Code of Conduct

By participating in this project, you agree to abide by the Code of Conduct.
See `CODE_OF_CONDUCT.md`.

---

Thank you for helping make CIIRAS reliable and trustworthy.
