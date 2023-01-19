import { createContext, useContext, useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const WebSocket = createContext()
const WebSocketDispatcher = createContext()

const WebSocketProvider = ({ children }) => {
    const [websocket, dispatch] = useState({})
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    const socket = useWebSocket(socketUrl, {
        shouldReconnect: (closeEvent) => true,
        onMessage: () => dispatch(socket)
    })


    useEffect(() => {
        dispatch(socket)
    }, [])

    return (
        <WebSocket.Provider value={websocket}>
            <WebSocketDispatcher.Provider value={dispatch}>
                {children}
            </WebSocketDispatcher.Provider>
        </WebSocket.Provider>
    );
}

export default WebSocketProvider;

export const useSocket = () => useContext(WebSocket)