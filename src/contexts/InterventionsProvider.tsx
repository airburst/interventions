import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {POLLING_API_URL, POLLING_INTERVAL} from "../constants";
import {useInterval} from "../hooks";
import {Intervention} from "../types";

export interface InterventionsProviderInterface {
  interventions: Intervention[];
}

const InterventionsContext =
  createContext<InterventionsProviderInterface | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const InterventionsProvider = ({children}: ProviderProps) => {
  const [interventions, setInterventions] = useState<Intervention[]>([]);

  // Define the API request
  const pollApi = useCallback(async () => {
    try {
      const response = await fetch(POLLING_API_URL);
      const data = (await response.json()) as Intervention[];
      // DEBUG:
      console.info("Polling API data for interventions");
      console.table(data.map(({name, isLive}) => ({name, isLive})));
      setInterventions(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Poll the API
  useInterval(pollApi, POLLING_INTERVAL);

  return (
    <InterventionsContext.Provider value={{interventions}}>
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
