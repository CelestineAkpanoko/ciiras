# CIIRAS — CI Issues Resolver Assurance System

![CIIRAS logo](img/ciiras%20logo.png.png)

CIIRAS (CI Issues Resolver Assurance System) is a safety-first, agentic system for **detecting, diagnosing, validating, and resolving CI failures**.

CIIRAS monitors CI pipelines (GitHub Actions first), constructs evidence-grounded failure reports, proposes **bounded and explainable fixes**, validates them deterministically, and only then proposes changes via **auditable pull requests**.

CIIRAS is not an “AI coder”.
It is an **assurance system for CI reliability**.

---

## What problem CIIRAS addresses

CI failures are expensive and noisy.

Most failures are:
- repetitive,
- localized,
- and resolvable with small, known fixes.

What makes them hard is not writing code — it is:
- extracting signal from unstructured CI logs,
- distinguishing real root causes from symptoms,
- choosing the safest viable change,
- proving the fix works,
- and knowing when **not** to act.

CIIRAS exists to enforce those guarantees.

---

## Core principles

CIIRAS is built around four non-negotiable axioms:

1. **Evidence precedes action**  
   No change is proposed without grounded evidence from CI artifacts.

2. **Validation precedes proposal**  
   A fix must pass deterministic validation before a PR is created.

3. **Policy precedes autonomy**  
   The agent proposes; a policy engine decides.

4. **Restraint is a valid outcome**  
   “Comment-only” or “no action” is often the correct result.

These principles apply regardless of language, framework, or CI provider.

---

## What CIIRAS does (v0)

### GitHub Actions (initial focus)

CIIRAS can:

- Detect failed workflow runs via webhooks or polling
- Normalize CI logs and annotations into structured **Incidents**
- Extract error spans and failure fingerprints
- Classify failures (TypeScript + Next.js initially)
- Propose one or more **Patch Candidates** using bounded strategies
- Validate candidates in isolated environments
- Decide — via policy — whether to:
  - open a pull request,
  - post a comment-only diagnosis,
  - or take no action
- Produce PRs that include:
  - exact evidence excerpts,
  - root-cause hypothesis,
  - files changed with rationale,
  - commands executed and results,
  - confidence score and risk level,
  - policy decision trace

---

## What CIIRAS will NOT do (by design)

CIIRAS intentionally refuses to:

- ❌ Push directly to default branches
- ❌ Force-merge PRs or bypass repository protections
- ❌ Disable TypeScript or CI checks to “make builds pass”
- ❌ Perform broad refactors or formatting-only changes
- ❌ Modify CI workflow definitions by default
- ❌ Execute unbounded or arbitrary shell commands
- ❌ Act when evidence or confidence is insufficient

When CIIRAS is uncertain, it **degrades safely** to comment-only diagnosis.

---

## Supported failure classes (v0)

### TypeScript
- **TS2307** — `Cannot find module`  
  - safe alias / paths remediation
  - case-sensitive import mismatches
  - missing export patterns (bounded)

- **TS2345** — common union narrowing errors  
  - safe type guards
  - non-null checks
  - minimal, localized fixes only

### Next.js
- `next build` failures caused by TypeScript compilation errors  
  - diagnosis + routing to TypeScript strategies

See `docs/05-supported-failures.md` for exact constraints.

---

## How trust is earned

CIIRAS is intentionally conservative.

Trust is earned through:

1. **Evidence-first reasoning**  
   Every decision references concrete log excerpts and file paths.

2. **Policy enforcement**  
   Risky actions are blocked regardless of model output.

3. **Deterministic validation**  
   No PR is opened without proof that the failure is resolved.

4. **Full auditability**  
   All tool calls, decisions, and policy outcomes are logged.

5. **Least-privilege access**  
   CIIRAS uses minimal GitHub permissions and explicit tool boundaries.

Recommended starting points:
- `docs/01-safety-model.md`
- `docs/03-agent-model.md`
- `docs/06-policy-engine.md`

---

## Execution modes (free-first)

### Mode A — Repository-local (GitHub Actions only)
- Runs entirely inside GitHub Actions
- No external infrastructure required
- State stored minimally in artifacts and PR comments
- Ideal for experimentation and OSS repos

### Mode B — Serverless orchestrator (AWS free tier)
- Webhook ingestion, state, and queues are externalized
- Validation still occurs via GitHub Actions
- Supports multi-repo operation and retries
- Remains free or near-free at low volume

See `docs/00-introduction.md` for a detailed comparison.

---

## Safety defaults

- PR-only changes (never push to default branch)
- Maximum files changed: 5 (configurable)
- Forbidden paths by default:
  - `.github/workflows/**`
  - `infra/**`
- Forbidden fixes by default:
  - disabling TypeScript checks
  - skipping validation
- Auto-merge disabled until confidence calibration proves safe

---

## Project status

CIIRAS is under active development.
The current focus is correctness, explainability, and safety — not breadth.

See `docs/11-roadmap.md` for planned extensions.

---

## Disclaimer

CIIRAS can propose changes to your repositories.
Run it with least privilege, review policies carefully, and treat it as an assistive assurance system — not a replacement for human judgment.
