# Threat Model

CIIRAS assumes CI logs and repositories may contain adversarial input.

Mitigations:
- no arbitrary command execution
- no prompt-derived commands
- redaction of sensitive data
- strict path and diff limits
