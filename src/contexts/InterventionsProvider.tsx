import {createContext, useCallback, useMemo, type ReactNode} from "react";
import {POLLING_API_URL, POLLING_INTERVAL} from "../constants";
import {useInterval} from "../hooks";
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

export const InterventionsProvider = ({children}: ProviderProps) => {
  const eventEmitter = useMemo(() => new EventEmitter<Intervention>(), []);

  // Define the API request
  const pollApi = useCallback(async () => {
    try {
      const response = await fetch(POLLING_API_URL);
      const data = (await response.json()) as Intervention[];
      // DEBUG:
      // console.info("Polling API data for interventions");
      // console.table(data.map(({name, isLive}) => ({name, isLive})));
      // Add listeners to event emitter
      data.forEach((intervention) => {
        if (intervention.isLive) {
          eventEmitter.emit(intervention.name, intervention);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [eventEmitter]);

  // Poll the API
  useInterval(pollApi, POLLING_INTERVAL);

  return (
    <InterventionsContext.Provider value={null}>
      {children}
    </InterventionsContext.Provider>
  );
};
