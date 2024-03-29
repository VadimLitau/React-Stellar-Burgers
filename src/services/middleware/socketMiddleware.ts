import { Middleware, MiddlewareAPI } from "redux";
import { IwsActions } from "../store";
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: IwsActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch} = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      if (socket && type === onClose) {
        socket.close(1000);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};
