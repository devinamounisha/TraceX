import { describe, expect, it } from "vitest";

import { SAFE_FORENSIC_OPERATIONS, isSafeForensicOperation } from "../shared/forensic-policy";

describe("restricted forensic policy", () => {
  it("contains only approved, non-evasive operations", () => {
    expect(SAFE_FORENSIC_OPERATIONS).toEqual([
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
    ]);
  });

  it("rejects arbitrary or security-control bypass commands", () => {
    expect(isSafeForensicOperation("READ_EVIDENCE")).toBe(true);
    expect(isSafeForensicOperation("DISABLE_SECURITY")).toBe(false);
    expect(isSafeForensicOperation("UPLOAD_MALWARE")).toBe(false);
    expect(isSafeForensicOperation("EXECUTE_SHELL")).toBe(false);
  });
});
