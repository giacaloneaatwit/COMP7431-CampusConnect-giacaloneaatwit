# Week 10 MVP Test, CI, and Freeze
Student: Andrew Giacalone
Date: 11/16/2026
Branch: release/week-10-rc1
Local URL: http://127.0.0.1:7860
Environment: Lovable
## 1. Six-test MVP record
| # | Quality area | Action and expected result | Observed evidence | Result |
|---|---|---|---|---|
| 1 | Supported retrieval | Ask: "How do I reset my CampusConnect password?" The answer uses
the approved password-reset passage. | CampusConnectPasswordHelp.txt | PASS |
| 2 | Citation support | Open the displayed source from Test 1. At least one important answer
claim is directly supported by the source passage. | The agent followed the given workflow closely | PASS |
| 3 | Unsupported query | Ask: "What are the Thanksgiving dining hall hours?" The system
states its IT-support limit and does not invent hours, a source, phone number, or office. |
The agent refers the user to a human, as it does not find anything | PASS |
| 4 | Voice and text fallback | Use the supported answer. If voice works, its meaning matches
the visible grounded answer. If voice is unavailable, the text, source, and a clear Continue
in text or retry path remain. | Voice was available and matched the text response | PASS |
| 5 | Video accessibility | Mute the tab and skip the video. AI disclosure and transcript
remain visible, and the chatbot is reachable by keyboard. | The transcript was visible and reachable from the keyboard | PASS |
| 6 | Latency and recovery | Time one supported question. Class target: grounded text in 5
seconds or less. If slower, the question is preserved and progress, retry, or text fallback is
clear. | Almost instant | PASS |
## 2. Lighthouse and manual accessibility evidence
Performance score: <FILL IN>
Accessibility score: <FILL IN>
One important Lighthouse finding or "none listed": <FILL IN>
Keyboard plus muted-video result: <FILL IN>
## 3. Defect decision and retest
Highest-severity finding: <FILL IN OR NONE>
Severity: <FILL IN - BLOCKER, SEVERE, MAJOR, MINOR, or NONE>
Smallest repair made: <FILL IN OR "No repair required">
Focused retest result: <FILL IN>
## 4. Release gate
Release decision: <FILL IN - GO or NO-GO>
Decision reason: <FILL IN>
GitHub Actions run: <PASTE RUN URL>
Release tag if GO: v0.9.0-rc1
## 5. Engineering and AI Use Log
What I tested myself: <FILL IN>
What remained human-reviewed rather than automated: <FILL IN>
Known limitation carried into Week 11 Red Teaming: <FILL IN>
