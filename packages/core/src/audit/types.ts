export type AuditLevel = "debug" | "info" | "warn" | "error";

export type AuditStage =
  | "detection"
  | "log_acquisition"
  | "analysis"
  | "strategy"
  | "validation"
  | "pr"
  | "policy"
  | "system";

export type EvidenceRef = {
  kind: "run_log" | "job_log" | "annotation" | "file" | "command_output" | "artifact";
  uri: string;
  sha256?: string;
};
