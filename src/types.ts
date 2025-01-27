export type Intervention = {
  name: string;
  description?: string;
  isLive: boolean;
  // Custom fields
  firstName?: string;
};

export type InterventionProps = Partial<Intervention>;

export type WithInterventionProps<T> = T & InterventionProps;
