import {Text} from "@simplybusiness/mobius";
import {InterventionProps} from "../../types";

export const TextIntervention = (props: InterventionProps) => {
  // Extract intervention data fields
  const {firstName} = props;
  // Build content
  const text = `Hello, ${firstName}! This is a text intervention.`;
  // Render custom UX
  return (
    <Text elementType="p" variant="h4">
      {text}
    </Text>
  );
};
