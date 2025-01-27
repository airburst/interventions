import {Alert} from "@simplybusiness/mobius";
import {InterventionProps} from "../../types";

export const AlertIntervention = (props: InterventionProps) => {
  // Extract intervention data fields
  const {firstName} = props;
  // Build content
  const content = `Hello, ${firstName}! This is a Alert intervention.`;
  // Render custom UX
  return (
    <Alert header="I am intervening!" show variant="info">
      {content}
    </Alert>
  );
};
