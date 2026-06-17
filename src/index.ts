import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import { WebSocketServer } from 'ws';
import { registerRoutes } from './routes';

const PORT = Number(process.env.PORT ?? 3000);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? '*';

type WsMessage = {
  callId: string;
  type: string;
  payload?: unknown;
};

function assertCallId(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

const app = express();
app.use(helmet());
app.use(cors({ origin: ALLOWED_ORIGIN, credentials: true }));
app.use(express.json({ limit: '1mb' }));

registerRoutes(app);

const server = http.createServer(app);

// MVP WebSocket scaffold.
// Full AC-05/AC-06/AC-09/AC-12 orchestration is intentionally out of scope for this minimal MVP server.
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (socket, req) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const callIdFromQuery = url.searchParams.get('callId') ?? '';

  socket.on('message', (data) => {
    try {
      const raw = data.toString('utf8');
      const msg = JSON.parse(raw) as Partial<WsMessage>;

      if (!assertCallId(msg.callId)) {
        socket.send(
          JSON.stringify({
            type: 'error',
            callId: callIdFromQuery || 'unknown',
            payload: { message: 'Invalid message: callId is required.' }
          })
        );
        return;
      }

      // Echo back for connectivity verification.
      socket.send(JSON.stringify({ type: 'ack', callId: msg.callId, payload: { receivedType: msg.type ?? 'unknown' } }));
    } catch (err) {
      socket.send(
        JSON.stringify({
          type: 'error',
          callId: callIdFromQuery || 'unknown',
          payload: { message: err instanceof Error ? err.message : 'Unknown error' }
        })
      );
    }
  });

  socket.on('error', () => {
    // Intentionally no-op for MVP.
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`init-salescoach-mvp listening on http://localhost:${PORT}`);
});
