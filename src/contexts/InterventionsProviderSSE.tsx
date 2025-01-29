import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import {EVENT_TYPE, SERVER_URL} from "../constants";
import {Intervention} from "../types";
import {EventEmitter} from "./EventEmitter";

export interface InterventionsProviderInterface {
  eventEmitter: EventEmitter<Intervention>;
}

const InterventionsContext =
  createContext<InterventionsProviderInterface | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const InterventionsProviderSSE = ({children}: ProviderProps) => {
  const eventEmitter = useMemo(() => new EventEmitter<Intervention>(), []);

  const handleInterventionUpdate = useCallback(
    (event: MessageEvent<typeof EVENT_TYPE.INTERVENTION>) => {
      const data = JSON.parse(event.data) as Intervention[];

      // DEBUG:
      console.info("SSE data for interventions");
      console.table(data.map(({name, isLive}) => ({name, isLive})));

      data.forEach((intervention) => {
        if (intervention.isLive) {
          eventEmitter.emit(intervention.name, intervention);
        }
      });
    },
    [eventEmitter],
  );

  useEffect(() => {
    // Create an EventSource to listen for server-sent events
    const eventSource = new EventSource(`${SERVER_URL}/sse`);

    // Message handler
    eventSource.addEventListener(
      EVENT_TYPE.INTERVENTION,
      handleInterventionUpdate,
    );

    eventSource.addEventListener("close", () => {
      console.log('Received "close" event. Closing connection...');
      eventSource.close();
    });

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, [handleInterventionUpdate]);

  return (
    <InterventionsContext.Provider value={{eventEmitter}}>
      {children}
    </InterventionsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInterventions = () => {
  const context = useContext(InterventionsContext);

  if (!context) {
    throw new Error(
      "useInterventions must be used within an InterventionsProvider",
    );
  }
  return context;
};
