import { describe, expect, it } from "vitest";
import { answerQuestion } from "./campus-guide";

describe("CampusConnect approved guide", () => {
  it("answers a supported Wi-Fi question with its source and owner", () => {
    const r = answerQuestion("How do I connect to the campus Wi-Fi?");
    expect(r.kind).toBe("answer");
    if (r.kind === "answer") {
      expect(r.source.file).toBe("CampusConnectWiFiHelp.txt");
      expect(r.source.owner).toBe("IT Service Desk example");
    }
  });

  it("refers an unsupported question to a human", () => {
    const r = answerQuestion("When is the registration deadline for spring?");
    expect(r).toEqual({ kind: "handoff", reason: "unsupported" });
  });

  it("flags an action request instead of claiming to do it", () => {
    const r = answerQuestion("Can you reset my password for me?");
    expect(r.kind).toBe("answer");
    if (r.kind === "answer") {
      expect(r.source.id).toBe("password");
      expect(r.isActionRequest).toBe(true);
    }
  });

  it("refuses to process a message that shares a password", () => {
    const r = answerQuestion("My password is hunter2, why can't I log in?");
    expect(r).toEqual({ kind: "handoff", reason: "sensitive" });
  });
});
