import {Text} from "@simplybusiness/mobius";
import {InterventionProps} from "../../types";
import "./Interventions.css";

export const TextIntervention = (props: InterventionProps) => {
  // Extract intervention data fields
  const {firstName} = props;

  return (
    <Text elementType="p" variant="h4" className="mobius-intervention">
      Hello, <span className="highlight">{firstName}</span>! This is a text
      intervention.
    </Text>
  );
};
