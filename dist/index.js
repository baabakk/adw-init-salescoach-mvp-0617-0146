"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const routes_1 = require("./routes");
const PORT = Number(process.env.PORT ?? 3000);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? '*';
function assertCallId(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: ALLOWED_ORIGIN, credentials: true }));
app.use(express_1.default.json({ limit: '1mb' }));
(0, routes_1.registerRoutes)(app);
const server = http_1.default.createServer(app);
// MVP WebSocket scaffold.
// Full AC-05/AC-06/AC-09/AC-12 orchestration is intentionally out of scope for this minimal MVP server.
const wss = new ws_1.WebSocketServer({ server, path: '/ws' });
wss.on('connection', (socket, req) => {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    const callIdFromQuery = url.searchParams.get('callId') ?? '';
    socket.on('message', (data) => {
        try {
            const raw = data.toString('utf8');
            const msg = JSON.parse(raw);
            if (!assertCallId(msg.callId)) {
                socket.send(JSON.stringify({
                    type: 'error',
                    callId: callIdFromQuery || 'unknown',
                    payload: { message: 'Invalid message: callId is required.' }
                }));
                return;
            }
            // Echo back for connectivity verification.
            socket.send(JSON.stringify({ type: 'ack', callId: msg.callId, payload: { receivedType: msg.type ?? 'unknown' } }));
        }
        catch (err) {
            socket.send(JSON.stringify({
                type: 'error',
                callId: callIdFromQuery || 'unknown',
                payload: { message: err instanceof Error ? err.message : 'Unknown error' }
            }));
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
