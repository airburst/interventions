import {cloneElement, ReactElement, ReactNode} from "react";
import {useInterventions} from "../hooks/useInterventions";

type InterventionWrapperProps = {
  name: string;
  children: ReactNode;
};

export const InterventionWrapper = ({
  name,
  children,
}: InterventionWrapperProps) => {
  const {interventions} = useInterventions();
  const thisIntervention = interventions.find((i) => i.name === name);
  const show = thisIntervention?.isLive ?? false;

  if (!show) {
    return null;
  }

  return cloneElement(children as ReactElement, {...thisIntervention});
};
