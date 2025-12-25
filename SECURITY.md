# Security Policy

CIIRAS is a safety-first system. Security issues are taken seriously.

If you believe you have found a vulnerability, please follow the process below.

---

## Supported Versions

CIIRAS is under active development.

| Version | Supported |
|--------|-----------|
| main   | ✅ Yes     |
| older releases | ❌ No |

Only the `main` branch is currently supported.

---

## Reporting a Vulnerability

**Please do not open public GitHub issues for security vulnerabilities.**

Instead, report issues privately by:
- Emailing: **celestineakpanoko@gmail.com**  

Include:
- A clear description of the issue
- Steps to reproduce (if applicable)
- Impact assessment (what could go wrong)
- Any suggested mitigations (optional)

You will receive an acknowledgment within **72 hours**.

---

## Scope

Security issues include, but are not limited to:
- Unauthorized repository access
- Policy bypass or privilege escalation
- Unsafe command execution
- Data leakage via logs or artifacts
- MCP tool boundary violations
- Supply-chain or dependency issues

---

## Responsible Disclosure

CIIRAS follows responsible disclosure practices.
We ask that you do not publicly disclose vulnerabilities until a fix or mitigation has been released.

---

## Security Design Notes

CIIRAS is designed with:
- Least-privilege GitHub permissions
- Policy-gated write actions
- Deterministic validation environments
- Full audit logging of tool calls and decisions

See `docs/08-threat-model.md` for architectural details.
