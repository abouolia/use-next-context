import {
  createContext,
  createElement,
  useContext,
  useRef,
  useState,
} from 'react';
import { useIsomorphicLayoutEffect } from './_utils';

const createNextProvider = (ReactProvider) => {
  const ContextProvider = ({ children, value }) => {
    const valueRef = useRef(value);
    const contextValue = useRef();

    if (!contextValue.current) {
      const listeners = new Set();

      contextValue.current = {
        value: valueRef.current,
        listeners: listeners,
      };
    }
    const triggerListeners = () => {
      contextValue.current.listeners.forEach((listener) => {
        listener({ value });
      });
    };
    useIsomorphicLayoutEffect(() => {
      valueRef.current = value;
      triggerListeners();
    }, [value]);

    return createElement(
      ReactProvider,
      { value: contextValue.current },
      children
    );
  };
  return ContextProvider;
};

export const createNextContext = (defaultValue) => {
  const Context = createContext({
    value: defaultValue,
    listeners: new Set(),
    update: (f) => f(),
  });
  Context.Provider = createNextProvider(Context.Provider);
  delete Context.Consumer;

  return Context;
};

export const useContextSelector = (reactContext, selector, comparator) => {
  const contextValue = useContext(reactContext);
  const [state, setState] = useState(null);

  const { listeners } = contextValue;
  const comparatorFn = comparator || Object.is;

  const update = ({ value }) => {
    const selected = selector(value);

    if (!comparatorFn(selected, state)) {
      setState(selected);
    }
  };
  useIsomorphicLayoutEffect(() => {
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, [listeners]);

  return state;
};
