# init-salescoach-mvp

Minimum viable backend scaffold for the **SalesCoach** initiative.

## Tech Stack
- Node.js + Express
- TypeScript
- WebSocket (`ws`)

## Prerequisites
- Node.js 18+

## Setup
```bash
npm install
```

## Run (dev)
```bash
npm run dev
```

Server:
- HTTP: `http://localhost:3000`
- WebSocket: `ws://localhost:3000/ws`

## Endpoints
- `GET /health` — health check
- `POST /api/calls/:callId/plan` — MVP placeholder call plan response

## Notes on Architecture Contracts
The developer plan specifies detailed AC-05/AC-06/AC-09/AC-10/AC-12 contracts (EventBus-only internal communication, AssemblyAI streaming adapter, PCRC-LLM orchestrator, MongoDB snapshots, and exact-once stage completion guards).

This repository currently includes a working Express + WebSocket server scaffold and a minimal API surface. The full contract-compliant orchestration modules are intended to be added in subsequent iterations.
