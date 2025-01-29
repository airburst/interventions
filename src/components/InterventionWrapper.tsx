import {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {useInterventions} from "../contexts/InterventionsProviderSSE";
import {Intervention} from "../types";

type InterventionWrapperProps = {
  name: string;
  children: ReactNode;
};

export const InterventionWrapper = ({
  name,
  children,
}: InterventionWrapperProps) => {
  const {eventEmitter} = useInterventions();
  const [intervention, setIntervention] = useState<Intervention | null>(null);
  const [show, setShow] = useState(false);

  const onDismiss = () => {
    setShow(false);
    eventEmitter?.off(name);
  };

  // Subscribe to events for the given intervention name
  useEffect(() => {
    eventEmitter?.on(name, (data) => {
      setIntervention(data);
      if (data.isLive) {
        setShow(true);
      }
    });
    return () => {
      eventEmitter?.off(name);
    };
  }, [eventEmitter, name]);

  if (!show) {
    return null;
  }

  return cloneElement(children as ReactElement, {
    ...(intervention || {}),
    onDismiss,
  });
};
