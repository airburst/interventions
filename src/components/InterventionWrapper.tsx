import {cloneElement, ReactElement, ReactNode, useRef} from "react";
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
  const showOnce = useRef(false);
  const thisIntervention = interventions.find((i) => i.name === name);

  if (thisIntervention?.isLive && !showOnce.current) {
    showOnce.current = true;
  }

  if (!showOnce.current) {
    return null;
  }

  return cloneElement(children as ReactElement, {...thisIntervention});
};
