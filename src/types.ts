export type Intervention = {
  name: string;
  description?: string;
  isLive: boolean;
  // Custom fields
  firstName?: string;
};

export type InterventionProps = Partial<Intervention> & {
  onDismiss?: () => void;
};

export type WithInterventionProps<T> = T & InterventionProps;

export type InterventionEvent = {
  data: string;
  event: string;
  id: string;
};
