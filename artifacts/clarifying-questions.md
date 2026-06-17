# Clarifying Questions: init-salescoach-mvp

> Generated at 2026-02-10T10:18:26.243Z
> Source: Claude-enhanced

## Summary

The contract has strong initiative definition and architecture constraints but critical gaps in requirements, edge cases, and risk mitigation. The empty requirements section (functional, non-functional, edge cases) blocks detailed implementation planning. Missing measurable outcomes prevent objective MVP success validation. The 10 external dependencies carry medium risk but lack documented mitigation strategies, creating vulnerability to cascading failures. Addressing these gaps—particularly functional requirements for each stage, AI quality thresholds, audio edge cases, and dependency fallback procedures—would significantly improve contract completeness and reduce implementation uncertainty.

## Questions

### CQ-01 [**CRITICAL**] — requirements

What are the specific functional requirements for each pre-call stage (Q1-Q3, framework selection, CR1-CR5, P1-P5, D1-D5)? For example: What exact data fields must be extracted in Q1? What validation rules apply? What constitutes 'completion' for each stage?

> The requirements section is empty with 'assumed' confidence. Acceptance criteria reference these stages (AC-01 through AC-04) but the underlying functional requirements are missing. This blocks detailed implementation planning and test case design.

### CQ-02 [**CRITICAL**] — requirements

What are the non-functional requirements for LLM response quality and consistency? Specifically: acceptable accuracy thresholds for data extraction, maximum retry attempts for failed extractions, fallback behavior when confidence is low, and quality gates for coaching cue relevance?

> Non-functional requirements section is empty. While latency targets exist (sub-500ms), there are no quality, accuracy, or reliability requirements for AI outputs. This affects prompt engineering, validation logic, and user experience design.

### CQ-03 [**CRITICAL**] — requirements

What edge cases must be handled for live call audio processing? For example: background noise handling, overlapping speech, long silences, audio dropouts, speaker misidentification, and transcription confidence below usable thresholds?

> Edge cases array is empty. AC-06 requires coaching cue suppression when 'transcription confidence drops' but no threshold is defined. AC-09 covers WebSocket reconnection but not audio stream recovery scenarios.

### CQ-04 [**IMPORTANT**] — acceptanceCriteria

What specific metrics define 'no visible jank' in AC-11? For example: maximum frame drop rate, acceptable UI freeze duration, target frames per second during concurrent updates, or specific performance budget thresholds?

> AC-11 uses subjective language ('no visible jank') without measurable criteria. This makes testing non-deterministic and prevents objective validation of OnPush change detection implementation.

### CQ-05 [**IMPORTANT**] — acceptanceCriteria

What are the measurable outcomes for MVP success? For example: target completion rate for pre-call planning, acceptable coaching cue relevance score, post-call summary accuracy threshold, or user satisfaction baseline?

> The measurableOutcomes array is empty. Without success metrics, there's no objective way to determine if the MVP achieves its goals or to prioritize quality improvements during development.

### CQ-06 [**CRITICAL**] — risksAndDependencies

What are the specific mitigation strategies for the 10 external dependencies, particularly for the 'medium' risk services? For example: What happens if AssemblyAI streaming fails mid-call? What's the fallback if both Cerebras and OpenAI are unavailable? How is guidebook data validated at startup?

> Risk classification shows elevated risk (score: 21) due to 10 dependencies, but the mitigations array is empty. This leaves the system vulnerable to cascading failures without documented recovery procedures.

### CQ-07 [**IMPORTANT**] — deliveryIntent

What constitutes 'completion' for each development phase? For example: Phase 2 says '5.5 days' but what specific deliverables, test coverage, or quality gates must be met before moving to Phase 3?

> Timeline assumptions list phase durations but not completion criteria. This creates ambiguity about when a phase is truly done versus 'good enough to move on,' risking technical debt accumulation.

### CQ-08 [**IMPORTANT**] — requirements

What are the data retention and privacy requirements for call recordings, transcripts, and extracted contact information? For example: How long is data stored? Can users delete their data? Are there any compliance considerations (GDPR, CCPA) even for single-user MVP?

> No requirements address data handling, retention, or privacy. MongoDB stores 'users, campaigns, contacts, call sessions, transcripts' but without defined lifecycle policies. This could create legal or ethical issues even in MVP.
