import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {POLLING_API_URL, POLLING_INTERVAL} from "../constants";
import {useInterval} from "../hooks";
import {Intervention, Interventions} from "../types";
import {EventEmitter} from "./EventEmitter";

export interface InterventionsProviderInterface {
  eventEmitter: EventEmitter<Intervention>;
}

const InterventionsContext =
  createContext<InterventionsProviderInterface | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const InterventionsProvider = ({children}: ProviderProps) => {
  const eventEmitter = useMemo(() => new EventEmitter<Intervention>(), []);

  // Define the API request
  const pollApi = useCallback(async () => {
    try {
      const response = await fetch(`${POLLING_API_URL}/interventions`);
      const data = (await response.json()) as Interventions;
      // DEBUG:
      console.info("Polling API data for interventions");
      console.table(data);

      // Add listeners to event emitter
      Object.entries(data).forEach(([name, intervention]) => {
        if (intervention.show) {
          eventEmitter.emit(name, intervention);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [eventEmitter]);

  // Poll the API
  useInterval(pollApi, POLLING_INTERVAL);

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
