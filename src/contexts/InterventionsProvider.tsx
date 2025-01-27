import {createContext, useCallback, type ReactNode} from "react";
import {POLLING_API_URL, POLLING_INTERVAL} from "../constants";
import {useInterval} from "../hooks";
import {useInterventions} from "../hooks/useInterventions";
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
  const {dispatch} = useInterventions();

  // Define the API request
  const pollApi = useCallback(async () => {
    try {
      const response = await fetch(POLLING_API_URL);
      const data = (await response.json()) as Intervention[];
      // DEBUG:
      // console.info("Polling API data for interventions");
      // console.table(data.map(({name, isLive}) => ({name, isLive})));
      dispatch({type: "SET", payload: data});
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // Poll the API
  useInterval(pollApi, POLLING_INTERVAL);

  return (
    <InterventionsContext.Provider value={null}>
      {children}
    </InterventionsContext.Provider>
  );
};
