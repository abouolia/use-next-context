export type Listener = ({ value }: any) => void;
export type Listeners = Set<Listener>;
export type ContextNextValue<T> = {
  value: T;
  listeners: Listeners;
};
