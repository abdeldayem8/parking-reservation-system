type WsStatus = "connecting" | "open" | "closed" | "error";

type ZoneUpdateMessage = {
  type: "zone-update";
  payload: any;
};

type AdminUpdateMessage = {
  type: "admin-update";
  payload: any;
};

type IncomingMessage = ZoneUpdateMessage | AdminUpdateMessage | { type: string; payload?: any };

export function createGateWebSocket(options: {
  url: string;
  gateId: string;
  onStatusChange?: (status: WsStatus) => void;
  onZoneUpdate?: (zone: any) => void;
  onAdminUpdate?: (payload: any) => void;
}) {
  const { url, gateId, onStatusChange, onZoneUpdate, onAdminUpdate } = options;
  let ws: WebSocket | null = null;

  const connect = () => {
    try {
      onStatusChange?.("connecting");
      ws = new WebSocket(url);

      ws.onopen = () => {
        onStatusChange?.("open");
        const subscribeMsg = { type: "subscribe", payload: { gateId } };
        ws?.send(JSON.stringify(subscribeMsg));
      };

      ws.onmessage = (event: MessageEvent) => {
        try {
          const msg: IncomingMessage = JSON.parse(event.data);
          if (msg.type === "zone-update" && msg.payload) {
            onZoneUpdate?.(msg.payload);
          } else if (msg.type === "admin-update" && msg.payload) {
            onAdminUpdate?.(msg.payload);
          }
        } catch (_) {
          // ignore malformed messages
        }
      };

      ws.onerror = () => onStatusChange?.("error");
      ws.onclose = () => onStatusChange?.("closed");
    } catch (_) {
      onStatusChange?.("error");
    }
  };

  const disconnect = () => {
    try {
      const unsubscribeMsg = { type: "unsubscribe", payload: { gateId } };
      ws?.readyState === WebSocket.OPEN && ws.send(JSON.stringify(unsubscribeMsg));
    } catch (_) {
      // ignore
    } finally {
      ws?.close();
      ws = null;
    }
  };

  return { connect, disconnect };
}

