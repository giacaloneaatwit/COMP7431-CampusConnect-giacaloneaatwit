# CampusConnect Requirements Specification v1
Status: Draft — Week 3
Student: Andrew Giacalone
Branch: docs/week-3-requirements-ai
## 1. Problem statement
Students who need IT Support information need a reliable way to find the correct
next step because the current experience may be scattered, difficult to search, or
hard to verify as current.
## 2. Evidence carried forward from Week 2
- E-01: Elena said "cannot see downstream results"
- E-02: Elena said "this ticket is too vague. I should route it again"
- A-01: Users don't check the FAQ before contacting IT support
## 3. One user journey inside the MVP
A student asks one typed IT Support question. CampusConnect searches only approved
IT Support material, returns a short answer with a visible source, or says the
available sources do not support an answer.
## 4. Four requirements
- FR-01 — The system shall accept one typed IT Support question.
- GR-01 — Every factual answer shall identify the approved source used.
- SF-01 — If approved sources are insufficient, the system shall not invent an
answer and shall provide a helpful IT Support next step.
- NFR-01 — A keyboard user shall be able to submit a question and read the result.
## 5. MVP boundary
IN: one typed question, approved IT Support material, one grounded answer, visible
source, safe failure, and helpful next step.
OUT: password resets, ticket creation, personal student records, voice, automatic
actions, and answers from unapproved material.
## 6. AI critique and human decision
- ChatGPT suggestion: GR-01
“approved source” is undefined, making “identify the approved source used” untestable
Without a clear definition, reviewers cannot verify correctness or prevent unapproved data use (scope + safety risk)
Define “approved source” as a finite, versioned list (e.g., specific URLs or documents) and require the system to return a direct reference (URL/title) from that list in every answer
- Claude suggestion: Section 2 (E-01, E-02, A-01), as it feeds FR-01, GR-01, SF-01, and NFR-01
The Week 2 evidence doesn't support the requirements: E-01 and E-02 are about ticket routing and downstream visibility (Elena's workflow), and A-01 is an unsourced claim about user behavior. None of them mention students finding current answers, scattered or stale sources, or abstention. The problem statement's "scattered, difficult to search, or hard to verify as current" is therefore an ASSUMPTION, and no requirement cites an evidence ID.
Without a traceable link, a reviewer cannot tell whether FR-01 through NFR-01 solve a real, observed problem. The evidence also points toward routing and ticket quality, which Section 5 puts OUT of scope, so the MVP may be answering a question your discovery never asked.
Add an "Evidence" column to the four requirements. Cite only IDs you actually have and mark the rest "ASSUMPTION, no Week 2 support." Relabel A-01 as ASSUMPTION unless you can point to its source, and label the problem statement's claim as ASSUMPTION. Then check your approved Week 2 artifacts for anything that does support a "find the correct next step" need. Humans (you and your team) decide what to do if nothing does.
- My decision: Accepted / Revised / Rejected
- My reason: <EXPLAIN USING WEEK 2 EVIDENCE, SCOPE, OR TESTABILITY>
