import {ReactNode} from "react";
import {useInterventions} from "../contexts/InterventionsProvider";

type InterventionWrapperProps = {
  name: string;
  children: ReactNode;
};

export const InterventionWrapper = ({
  name,
  children,
}: InterventionWrapperProps) => {
  const {data} = useInterventions();
  // Find intervention by name
  const thisIntervention = data.find(
    (intervention) => intervention.name === name,
  );

  if (!thisIntervention || !thisIntervention.isLive) {
    return null;
  }
  // This is a simple conditional render. If you need to refer to interventions
  // inside the rendered child, then you can call useInterventions() inside it.
  return <>{children}</>;
};
