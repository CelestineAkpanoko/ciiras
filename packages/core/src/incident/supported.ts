/**
 * Supported failure targets for v0.
 *
 * This is intentionally small and explicitly enumerated:
 * - TS2307: Cannot find module
 * - TS2345: Type mismatch
 * - Next build failure caused by TS errors
 */
export const SupportedFailureCode = {
  TS2307: "TS2307",
  TS2345: "TS2345",
  TS5058: "TS5058",
  NEXT_BUILD_TS_FAILURE: "NEXT_BUILD_TS_FAILURE"
} as const;

export type SupportedFailureCode = (typeof SupportedFailureCode)[keyof typeof SupportedFailureCode];

export const SUPPORTED_FAILURE_CODES: readonly SupportedFailureCode[] = [
  SupportedFailureCode.TS2307,
  SupportedFailureCode.TS2345,
  SupportedFailureCode.TS5058,
  SupportedFailureCode.NEXT_BUILD_TS_FAILURE
] as const;

/**
 * Helper for defensive checks in policy engines and pipelines.
 */
export function isSupportedFailureCode(code: string): code is SupportedFailureCode {
  return (SUPPORTED_FAILURE_CODES as readonly string[]).includes(code);
}
