# Incident Model

An Incident is the canonical representation of a CI failure.

It includes:
- CI metadata (provider, run, job, step)
- normalized log excerpts
- extracted error spans
- repository context snapshot
- failure fingerprint
- decision history

Incidents are immutable and replayable.
