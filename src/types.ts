export type Intervention = {
  show: boolean;
  // Custom fields
  firstName?: string;
};

export type Interventions = Record<string, Intervention>;

export type InterventionProps = Partial<Intervention> & {
  onDismiss?: () => void;
};

export type WithInterventionProps<T> = T & InterventionProps;

export type InterventionEvent = {
  data: string;
  event: string;
  id: string;
};
