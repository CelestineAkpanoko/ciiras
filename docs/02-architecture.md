# Architecture Overview

CIIRAS is organized as a pipeline of bounded components:

1. Detection (CI adapters)
2. Incident modeling (canonical state)
3. Analysis (evidence extraction and classification)
4. Strategy generation (bounded hypotheses)
5. Validation (deterministic proof)
6. Policy decision (final authority)
7. Output (PR, comment-only, or no-action)
8. Learning (post-hoc, bounded)

Each stage has a single responsibility and explicit inputs/outputs.
