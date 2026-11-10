// Approved CampusConnect IT guide.
// Status: synthetic classroom data — never present as real university policy.

export type GuideSource = {
  id: string;
  title: string;
  file: string;
  owner: string;
  reviewed: string;
  keywords: string[];
  guidance: string[];
};

export const GUIDE_SOURCES: GuideSource[] = [
  {
    id: "password",
    title: "Password reset help",
    file: "CampusConnectPasswordHelp.txt",
    owner: "IT Service Desk example",
    reviewed: "2026-09-01",
    keywords: ["password", "reset", "forgot", "locked", "login", "log in", "sign in", "mfa", "account"],
    guidance: [
      "Use the official campus self-service password page to reset your password.",
      "If you are locked out after several attempts, wait and try again, or contact the IT Service Desk.",
      "Never share your password or recovery codes with anyone, including staff or this assistant.",
    ],
  },
  {
    id: "wifi",
    title: "Secure campus Wi-Fi help",
    file: "CampusConnectWiFiHelp.txt",
    owner: "IT Service Desk example",
    reviewed: "2026-09-01",
    keywords: ["wifi", "wi-fi", "wireless", "network", "internet", "connect", "eduroam", "ssid"],
    guidance: [
      "Connect to the secure campus network, not the open guest network.",
      "Sign in with your campus account when your device asks.",
      "If your device will not connect, forget the network and rejoin, then contact the IT Service Desk if it still fails.",
    ],
  },
  {
    id: "service-desk",
    title: "IT Service Desk",
    file: "CampusConnectServiceDesk.txt",
    owner: "IT Service Desk example",
    reviewed: "2026-09-01",
    keywords: ["service desk", "help desk", "helpdesk", "ticket", "support", "technician", "human", "staff"],
    guidance: [
      "The IT Service Desk handles campus technology problems this guide cannot solve.",
      "Reach them through the official contact options on your campus IT website.",
      "Describe the problem, but do not include passwords, recovery codes, or student records.",
    ],
  },
];

export const HUMAN_HANDOFF =
  "I can’t support an answer from the approved guide. Please contact the IT Service Desk so a person can help.";

const ACTION_PATTERN =
  /\b(can you|could you|please|will you)\b.*\b(reset|change|unlock|fix|create|delete|update)\b/i;
const SENSITIVE_PATTERN =
  /\b(my password is|password:|recovery code|student id|ssn|social security|date of birth)\b/i;

export type GuideAnswer =
  | { kind: "answer"; source: GuideSource; isActionRequest: boolean }
  | { kind: "handoff"; reason: "unsupported" | "sensitive" | "empty" };

function score(question: string, source: GuideSource) {
  const q = question.toLowerCase();
  return source.keywords.reduce((n, k) => (q.includes(k) ? n + 1 : n), 0);
}

export function answerQuestion(question: string): GuideAnswer {
  const q = question.trim();
  if (!q) return { kind: "handoff", reason: "empty" };
  if (SENSITIVE_PATTERN.test(q)) return { kind: "handoff", reason: "sensitive" };

  const ranked = GUIDE_SOURCES.map((s) => ({ s, n: score(q, s) })).sort((a, b) => b.n - a.n);
  const best = ranked[0];
  if (!best || best.n === 0) return { kind: "handoff", reason: "unsupported" };

  return { kind: "answer", source: best.s, isActionRequest: ACTION_PATTERN.test(q) };
}
