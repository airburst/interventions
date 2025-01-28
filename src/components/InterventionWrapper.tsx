import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {useInterventions} from "../contexts/InterventionsProvider";
import {Intervention} from "../types";

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
  const [intervention, setIntervention] = useState<Intervention | null>(null);

  // Subscribe to events for the given intervention name
  useEffect(() => {
    eventEmitter?.on(name, (data) => {
      setIntervention(data);
      if (data.isLive) {
        setShow(true);
      }
    });
  }, [eventEmitter, name]);

  if (!show) {
    return null;
  }

  if (intervention?.isLive && !showOnce.current) {
    showOnce.current = true;
  }

  return cloneElement(children as ReactElement, {...intervention});
};
