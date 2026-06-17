import type { Express, Request, Response } from 'express';

export function registerRoutes(app: Express): void {
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ ok: true, service: 'init-salescoach-mvp' });
  });

  // Minimal API surface for MVP connectivity.
  app.post('/api/calls/:callId/plan', (req: Request, res: Response) => {
    const { callId } = req.params;
    if (!callId || callId.trim().length === 0) {
      res.status(400).json({ error: 'callId is required' });
      return;
    }

    // MVP: return a deterministic placeholder plan shape.
    // Full AC-04 generation is out of scope for this minimal server scaffold.
    res.status(200).json({
      callId,
      objective: 'Prepare for discovery with a structured plan',
      priorities: ['Clarify call objective', 'Identify decision criteria', 'Confirm next steps'],
      risks: ['Unclear stakeholders', 'Missing timeline', 'No defined success criteria'],
      targetNextStep: 'Schedule follow-up discovery call with stakeholders',
      unknowns: ['Budget range', 'Implementation timeline', 'Primary decision maker']
    });
  });
}
