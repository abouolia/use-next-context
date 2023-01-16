import React, { ReactNode, Context } from 'react';

export type Listener = ({ value }: any) => void;
export type Listeners = Set<Listener>;
export type ContextNextValue<T> = {
  value: T;
  listeners: Listeners;
};

export type NextContextProvider<T> = (props: {
  children: ReactNode;
  value: T;
}) => React.FunctionComponentElement<React.ProviderProps<ContextNextValue<T>>>;

export interface NextContext<T> extends Omit<Context<T>, 'Provider'> {
  Provider: NextContextProvider<T>;
  ORIGINAL_PROVIDER: NextContextProvider<T>;
}
