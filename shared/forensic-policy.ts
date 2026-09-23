export const SAFE_FORENSIC_OPERATIONS = [
  "READ_EVIDENCE",
  "HASH",
  "SEARCH",
  "FILTER",
  "TIMELINE",
  "EXTRACT_METADATA",
  "ANALYZE_LOG",
  "ANALYZE_PCAP",
  "MATCH_IOC",
  "GENERATE_REPORT",
] as const;

export type SafeForensicOperation = (typeof SAFE_FORENSIC_OPERATIONS)[number];

export function isSafeForensicOperation(value: string): value is SafeForensicOperation {
  return (SAFE_FORENSIC_OPERATIONS as readonly string[]).includes(value);
}
