import {Alert} from "@simplybusiness/mobius";
import {InterventionProps} from "../../types";
import "./Interventions.css";

export const AlertIntervention = (props: InterventionProps) => {
  // Extract intervention data fields
  const {firstName} = props;

  return (
    <Alert
      header="I am intervening!"
      show
      variant="error"
      className="mobius-intervention"
    >
      Hello, <span className="highlight">{firstName}</span>! This is an Alert
      intervention.
    </Alert>
  );
};
