# Architecture Guardrails: init-salescoach-mvp

> Generated at 2026-06-17T01:44:16.414Z
> Source: File-based
> Derived from: tpm-contract.json

## Interfaces

### **AssemblyAI v3 Streaming API** — real-time transcription with `format_turns=true` and `ForceEndpoint` message support (shared-lib)

External dependency: **AssemblyAI v3 Streaming API** — real-time transcription with `format_turns=true` and `ForceEndpoint` message support

**Contract:** Integration point — risk: medium

### **Cerebras API** — primary LLM provider for fast inference (sub-second response for extraction and coaching) (shared-lib)

External dependency: **Cerebras API** — primary LLM provider for fast inference (sub-second response for extraction and coaching)

**Contract:** Integration point — risk: medium

### **OpenAI API** — fallback LLM provider when Cerebras is unavailable or degraded (shared-lib)

External dependency: **OpenAI API** — fallback LLM provider when Cerebras is unavailable or degraded

**Contract:** Integration point — risk: medium

### **Voice Engine Proxy** (prototypedemos.com) — proxies TTS requests to ElevenLabs/FishAudio (shared-lib)

External dependency: **Voice Engine Proxy** (prototypedemos.com) — proxies TTS requests to ElevenLabs/FishAudio

**Contract:** Integration point — risk: medium

### **MongoDB** — persistent storage for users, campaigns, contacts, call sessions, transcripts, and call plans (shared-lib)

External dependency: **MongoDB** — persistent storage for users, campaigns, contacts, call sessions, transcripts, and call plans

**Contract:** Integration point — risk: medium

### **SPICED + MEDDPICC Guidebook Data** — loaded from JSON into GuidebookStore at startup; defines dimensions, required fields, and question banks (shared-lib)

External dependency: **SPICED + MEDDPICC Guidebook Data** — loaded from JSON into GuidebookStore at startup; defines dimensions, required fields, and question banks

**Contract:** Integration point — risk: medium

### **Pre-Call Questions Schema** (`precall-questions-schema.json`) — defines initial questions, field metadata, and extraction rules for Q1-Q3 (shared-lib)

External dependency: **Pre-Call Questions Schema** (`precall-questions-schema.json`) — defines initial questions, field metadata, and extraction rules for Q1-Q3

**Contract:** Integration point — risk: medium

### **Fuse Admin Template** — Angular Material + TailwindCSS design system providing layout, navigation, and component library (shared-lib)

External dependency: **Fuse Admin Template** — Angular Material + TailwindCSS design system providing layout, navigation, and component library

**Contract:** Integration point — risk: medium

### **Docker + Nginx** — containerized deployment with reverse proxy for WebSocket upgrade support (shared-lib)

External dependency: **Docker + Nginx** — containerized deployment with reverse proxy for WebSocket upgrade support

**Contract:** Integration point — risk: medium

### **AWS ECS** — production hosting (ECR for images, Secrets Manager for API keys, ALB for traffic) (shared-lib)

External dependency: **AWS ECS** — production hosting (ECR for images, Secrets Manager for API keys, ALB for traffic)

**Contract:** Integration point — risk: medium

## Data Contracts

*(No data contracts identified)*

## Scalability

**Expected Load:** Not specified in contract

## Security Baseline

- **Auth Method:** TBD — not specified in contract
- **Data Classification:** TBD — not specified in contract

## Architecture Decision Records

*(No ADRs generated)*

## Confidence & Gaps

**Confidence:**
- interfaces: *inferred*
- dataContracts: *assumed*
- scalability: *assumed*
- securityBaseline: *assumed*
- adrs: *assumed*

**Gaps:**
- No LLM available — guardrails built from contract data only. ADRs and data contracts not generated.
