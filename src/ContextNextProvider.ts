import {
  createContext,
  createElement,
  useEffect,
  useRef,
  Provider,
  ReactNode,
} from 'react';
import { ContextNextValue, Listener, NextContext } from './types';

const PROVIDER_NAME = '@use-context-next';
const ORIGINAL_PROVIDER = Symbol();

export const createNextContext = <Value>(defaultValue: Value) => {
  const Context = createContext<ContextNextValue<Value>>({
    value: defaultValue,
    listeners: new Set<Listener>(),
  } as ContextNextValue<Value>);

  const NextContext = Context as unknown as NextContext<Value>;

  (NextContext as any).Provider = createNextProvider<Value>(Context.Provider);
  (NextContext as any)[ORIGINAL_PROVIDER] = Context.Provider;

  NextContext.displayName = PROVIDER_NAME;

  return NextContext;
};

const createNextProvider = <Value>(
  ReactProvider: Provider<ContextNextValue<Value>>
) => {
  const ContextProvider = ({
    children,
    value,
  }: {
    children: ReactNode;
    value: Value;
  }) => {
    const listeners = new Set<Listener>();
    const contextValue = useRef<ContextNextValue<Value>>({ value, listeners });

    const triggerListeners = () => {
      if (!contextValue.current) return;

      contextValue.current.listeners.forEach((listener) => {
        listener({ value });
      });
    };
    useEffect(() => {
      contextValue.current.value = value;
      triggerListeners();
    }, [value]);

    return createElement(
      ReactProvider,
      { value: contextValue.current },
      children
    );
  };
  ContextProvider.displayName = PROVIDER_NAME;
  return ContextProvider;
};
