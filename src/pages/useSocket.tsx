import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(url, {
      transports: ["websocket"],
      reconnectionAttempts: 10,
    });

    newSocket.on("connect", () => {
      console.log("WebSocket connected:", newSocket.id);
      setSocket(newSocket);
    });

    newSocket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    newSocket.on("disconnect", () => {
      console.log("WebSocket disconnected");
      setSocket(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;
