import type { AuditEvent } from "./schema.js";

/**
 * AuditSink is append-only: consumers should store or emit events in order.
 * Nothing in the system should mutate past audit entries.
 */
export interface AuditSink {
  append(event: AuditEvent): Promise<void>;
}

/**
 * Convenience sink for local/dev/testing.
 * In production, replace with durable storage (S3/Dynamo/Postgres/etc).
 */
export class InMemoryAuditSink implements AuditSink {
  private readonly events: AuditEvent[] = [];

  async append(event: AuditEvent): Promise<void> {
    this.events.push(event);
  }

  getAll(): readonly AuditEvent[] {
    return this.events;
  }
}
