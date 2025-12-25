# Policy Engine

The Policy Engine is the final authority in CIIRAS.

It decides:
- whether a patch may be validated,
- whether a PR may be opened,
- whether auto-merge is permitted.

Inputs:
- confidence score
- risk classification
- validation result
- repository constraints

The Policy Engine is deterministic and auditable.
