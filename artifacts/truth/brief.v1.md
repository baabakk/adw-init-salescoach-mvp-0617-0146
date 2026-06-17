# Initiative Brief: init-salescoach-mvp

## Problem

Sales representatives consistently enter high-stakes calls underprepared — without a structured plan, without awareness of which discovery questions to prioritize, and without real-time support when conversations drift off track. Post-call feedback arrives too late and too subjectively to drive behavior change. Industry data shows reps forget 70% of training within a week, and fewer than 40% of calls follow any structured methodology (SPICED, MEDDPICC, etc.). Existing tools (Gong, Chorus, Clari) focus on post-call analytics and manager visibility — none provide decision support in the moment when it matters most.

## Goals

- Deliver an AI-driven pre-call planning system that reaches Minimum Viable Clarity (MVC) through LLM-powered conversational intake, replacing static checklists with adaptive questioning
- Provide real-time coaching cues during live calls — sparse, contextual, and non-intrusive (max 1 cue per 30-45 seconds) — surfaced at the exact moment they are useful
- Generate structured post-call deliverables: summary, scorecard (8 categories), one strength, one improvement area, and one concrete practice recommendation
- Support guidebook-driven coaching flows using SPICED (primary) and MEDDPICC (secondary) sales frameworks, with architecture ready for additional frameworks post-MVP
- Achieve sub-500ms latency for both coaching cue delivery and transcription display during live calls
- Prove the end-to-end loop — Prepare, Call, Coach, Review, Improve — in a single-user web application

## Non-Goals

- We are NOT building CRM integrations (Salesforce, HubSpot, GoHighLevel) in this phase
- No multi-user roles, manager dashboards, team reporting, or rep ranking — this is a single-rep private tool
- No mobile app — desktop browser only (Chrome primary, Firefox/Edge secondary)
- No PSTN/SIP telephony integration — audio captured from rep's local device
- No multi-language coaching — English only
- No emotion recognition, sentiment scoring, or engagement detection during calls
- No compliance enforcement engine or legal/procurement advice
- No persistent learning across users or longitudinal rep skill profiles (architecturally supported, deferred)
- No real-time scoring, probability boards, or advanced analytics during calls
- We will NOT build the full framework elimination decision tree — a placeholder (SPICED + MEDDPICC) is used for MVP, replaceable post-launch without interface changes

## Acceptance Criteria

- Pre-call conversational intake completes Q1-Q3 super-clarifying questions with LLM-driven data extraction and contextual follow-ups until all required fields are filled
- Framework selection returns SPICED (primary) + MEDDPICC (secondary) and proceeds to guidebook-derived question packs for missing fields
- Call Reasoning (CR1-CR5), Persona (P1-P5), and Demographics (D1-D5) stages complete sequentially, each gated by a fire-once completion event
- Call plan is generated with: objective, 3 priorities, 2 risks, target next step, and unknowns list
- Live transcription displays with speaker diarization (rep vs. prospect) at sub-500ms latency via AssemblyAI streaming
- Coaching cues appear on-screen within 500ms of trigger detection, throttled to max 1 per 30 seconds
- Post-call summary, scorecard, and lessons are generated within 10 seconds of call end
- All extracted data carries confidence tags (confirmed, inferred, assumed)
- WebSocket reconnects automatically (max 5 attempts, 3s delay) without losing call state
- LLM provider failover switches between Cerebras and OpenAI transparently on provider failure
- UI renders with OnPush change detection — no visible jank during live call with concurrent transcript + coaching cue updates
- All event-driven communication flows through EventBus — no direct handler-to-handler calls

## Stakeholders

- **Product Owner & Technical Lead:** Sole founder-developer — owns product vision, architecture, and all implementation
- **Target User Persona:** Sales Representative (Individual Contributor) — runs their own calls, uses SalesCoach privately, wants to improve outcomes and consistency without manager oversight
- **LLM Providers:** Cerebras (primary, fast inference) and OpenAI (fallback, broad model support)
- **STT Provider:** AssemblyAI (v3 streaming API with turn-level formatting)
- **TTS Providers:** ElevenLabs and FishAudio via Voice Engine proxy
- **Design System:** Fuse Admin Template + Angular Material + TailwindCSS (Royal Blue #1D7AE6, Teal #0D7F86, Emerald #22C6B8)

## Timeline

- **Phase 0 — Foundation & Infrastructure:** COMPLETE
- **Phase 1 — PCRC Q1-Q3 LLM-Driven Questions:** COMPLETE
- **Phase 2 — Framework Selection + Guidebook Questions:** 5.5 days (placeholder selection + question packs for missing fields)
- **Phase 3 — Call Reasoning + Persona + Demographics:** 4-5 days (CR1-CR5, P1-P5, D1-D5 sequential stages)
- **Phase 4 — Enhanced Call Plan Generation:** 3-4 days (objective, priorities, risks, next step, unknowns)
- **Phase 5 — Live Coaching AI:** 5-7 days (trigger detection, cue generation, throttling, degraded mode)
- **Phase 6 — Post-Call AI:** 4-5 days (summary generation, 8-category scoring, lessons learned)
- **Phase 7 — End-to-End Testing & Performance Validation:** 5-7 days (full journey testing, latency validation, WebSocket resilience)
- **Target MVP Complete:** ~4-5 weeks from current state

## Budget

- Engineering: 1 founder-developer, full-time (~5 weeks remaining to MVP)
- Infrastructure (monthly):
  - Cerebras API: ~$50-150/month (primary LLM inference)
  - OpenAI API: ~$30-80/month (fallback LLM)
  - AssemblyAI: ~$50-100/month (streaming STT)
  - ElevenLabs/FishAudio: ~$20-50/month (TTS)
  - AWS ECS + MongoDB: ~$150-300/month (compute, database, ALB)
- Total estimated monthly run cost: ~$300-680/month

## Constraints

- Single developer — all frontend, backend, AI integration, infrastructure, and testing done by one person; scope must remain tightly controlled
- Must use existing tech stack: Angular 19 + Node.js/Express + MongoDB + WebSocket — no new frameworks or databases
- All backend handler communication must flow through the EventBus pub/sub system — no direct handler-to-handler calls permitted
- PCRC-LLM Handler is the sole orchestrator for all pre-call stages — old individual handlers (CallReasoning, Persona, Demographics) remain disabled to prevent conflicts
- LLM model names must never be hardcoded — providers use environment-configured defaults (`CEREBRAS_DEFAULT_MODEL`, `OPENAI_DEFAULT_MODEL`)
- Coaching cues must be non-intrusive: max 1 per 30-45 seconds, suppressible when transcription confidence drops
- Audio processing must use Opus/Ogg for streaming (not MP3) — `ogg-opus-decoder` for browser, not `opus-stream-decoder` which has Node.js dependencies
- All stage completion events must fire exactly once per callId (enforced via `Set<string>` guards)
- Frontend uses OnPush change detection — all async state changes require explicit `markForCheck()`

## Dependencies

- **AssemblyAI v3 Streaming API** — real-time transcription with `format_turns=true` and `ForceEndpoint` message support
- **Cerebras API** — primary LLM provider for fast inference (sub-second response for extraction and coaching)
- **OpenAI API** — fallback LLM provider when Cerebras is unavailable or degraded
- **Voice Engine Proxy** (prototypedemos.com) — proxies TTS requests to ElevenLabs/FishAudio
- **MongoDB** — persistent storage for users, campaigns, contacts, call sessions, transcripts, and call plans
- **SPICED + MEDDPICC Guidebook Data** — loaded from JSON into GuidebookStore at startup; defines dimensions, required fields, and question banks
- **Pre-Call Questions Schema** (`precall-questions-schema.json`) — defines initial questions, field metadata, and extraction rules for Q1-Q3
- **Fuse Admin Template** — Angular Material + TailwindCSS design system providing layout, navigation, and component library
- **Docker + Nginx** — containerized deployment with reverse proxy for WebSocket upgrade support
- **AWS ECS** — production hosting (ECR for images, Secrets Manager for API keys, ALB for traffic)
