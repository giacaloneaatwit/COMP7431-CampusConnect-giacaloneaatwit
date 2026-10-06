# Week 4 LM Studio RAG Results
Name: Andrew Giacalone
Model: IBM Granite 4.0 H Tiny Q4_K_M
Documents: CampusConnectPasswordHelp.txt CampusConnectWiFiHelp.txt
## Supported question
Result: PASS
Observation: It correctly cited the wifihelp text file as a source, and gave the right details
## Unsupported question
Result: PASS
Observation: The agent didnt find any information, and correctly said as much
## Action request
Result: PASS
Observation: It correctly cited the passwordhelp source, and did not claim to have done anything
## Architecture lesson
The local LLM route worked well when searching through given sources. It needs human help
when information is not found or actions need to be taken.
