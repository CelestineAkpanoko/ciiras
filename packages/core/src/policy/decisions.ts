export type RiskLevel = "low" | "medium" | "high" | "forbidden";

export type PolicyConstraints = {
  maxFilesChanged?: number;
  maxLinesChanged?: number;
  allowNewFiles?: boolean;
};

export type PolicyDecision =
  | {
      allow: true;
      risk: Exclude<RiskLevel, "forbidden">;
      reason: string;
      constraints?: PolicyConstraints;
    }
  | {
      allow: false;
      risk: "forbidden";
      reason: string;
    };
