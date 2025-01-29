import {useEffect, useState} from "react";
import {Intervention} from "../types";

export const useSSE = (url: string) => {
  const [data, setData] = useState<Intervention[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    // Handle incoming data
    eventSource.onmessage = (event) => {
      console.log("🚀 ~ useEffect ~ event:", event);
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    // Handle errors
    eventSource.onerror = (err) => {
      console.log("🚀 ~ eventSource.onerror:", err);
      setError("Connection lost. Trying to reconnect...");
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      console.log('Received "close" event. Closing connection...');
      eventSource.close();
    });

    // Cleanup when component unmounts
    return () => eventSource.close();
  }, [url]);

  return {data, error};
};

export default useSSE;
