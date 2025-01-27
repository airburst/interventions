import {ReactNode, useEffect, useState} from "react";
import {useInterventions} from "../contexts/InterventionsProvider";

type InterventionWrapperProps = {
  name: string;
  children: ReactNode;
};

export const InterventionWrapper = ({
  name,
  children,
}: InterventionWrapperProps) => {
  const {eventEmitter} = useInterventions();
  const [show, setShow] = useState(false);

  // Subscribe to events for the given intervention name
  useEffect(() => {
    eventEmitter?.on(name, (intervention) => {
      if (intervention.isLive) {
        setShow(true);
      }
    });
  }, [eventEmitter, name]);

  if (!show) {
    return null;
  }
  // This is a simple conditional render. If you need to refer to interventions
  // inside the rendered child, then you can call useInterventions() inside it.
  return <>{children}</>;
};
