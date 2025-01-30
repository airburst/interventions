import {useEffect, useState} from "react";
import {Intervention} from "../types";

// This hook allows for any component to conenct to a stream
// without needing to be wrapped in a provider.
export const useSSE = (url: string) => {
  const [data, setData] = useState<Intervention[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    // Handle incoming data
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    // Handle errors
    eventSource.onerror = (err) => {
      console.error("eventSource.onerror:", err);
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
