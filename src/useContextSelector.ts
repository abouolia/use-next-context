import React, { useContext, useState } from 'react';
import { ContextNextValue } from './types';
import { useIsomorphicLayoutEffect } from './utils';

export const useContextSelector = <Value, Output>(
  context: React.Context<ContextNextValue<Value>>,
  selector: (value: Value) => Output,
  comparator: (value1: any, value2: any) => boolean = Object.is
): Output => {
  const contextValue = useContext<ContextNextValue<Value>>(context);

  const initialValue = selector(contextValue.value);
  const [state, setState] = useState<Output>(initialValue);

  const { listeners } = contextValue;
  const comparatorFn = comparator || Object.is;

  const update = ({ value }: { value: Value }) => {
    const selected = selector(value);

    setState((oldState) => {
      if (!comparatorFn(selected, oldState)) {
        return selected;
      }
      return oldState;
    });
  };
  useIsomorphicLayoutEffect(() => {
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, [listeners]);

  return state as Output;
};
