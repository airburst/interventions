import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {useInterventions} from "../hooks/useInterventions";

type InterventionWrapperProps = {
  name: string;
  children: ReactNode;
};

export const InterventionWrapper = ({
  name,
  children,
}: InterventionWrapperProps) => {
  const showOnce = useRef(false);
  const {eventEmitter} = useInterventions();
  const [show, setShow] = useState(false);

  // Subscribe to events for the given intervention name
  useEffect(() => {
    eventEmitter?.on(name, (data) => {
      if (data.isLive) {
        setShow(true);
      }
    });
    // return () => {
    //   eventEmitter?.off(name);
    // };
  }, [eventEmitter, name]);

  if (!show) {
    return null;
  }

  if (thisIntervention?.isLive && !showOnce.current) {
    showOnce.current = true;
  }

  if (!showOnce.current) {
    return null;
  }

  return cloneElement(children as ReactElement, {...thisIntervention});
};
