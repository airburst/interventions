import {useAtom} from "jotai";
import {atomWithReducer} from "jotai/utils";
import {Intervention} from "../types";

// Define the state interface
interface InterventionState {
  interventions: Intervention[];
}

// Define action types
type InterventionAction = {type: "SET"; payload: Intervention[]};

// Initial state
const initialState: InterventionState = {
  interventions: [],
};

// Reducer function
const interventionsReducer = (
  state: InterventionState,
  action: InterventionAction,
): InterventionState => {
  switch (action.type) {
    case "SET":
      return {...state, interventions: action.payload};
    default:
      return state;
  }
};

const interventionsReducerAtom = atomWithReducer(
  initialState,
  interventionsReducer,
);

export const useInterventions = () => {
  const [state, dispatch] = useAtom(interventionsReducerAtom);

  return {
    interventions: state.interventions,
    dispatch,
  };
};
