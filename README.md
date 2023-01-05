# Next Context

Next Context is a performance optimized subscriber with same React Context API design.

There's a performance issue in using React Context when the value of `Context.Provider` mutating all consumers using `useContext`, will re-render even if the component wasn't use the mutated value because the `useContext` retrieves a object any mutations to that object leads to create a new one with different reference and cause re-rendering, there's no any way to select specific value in the React Context.

We solved that problem by adding another hook `useContextSelector` gives ability to select specific value by selector, don't render on each mutatation and the component will re-render just if the value of context selector is changed.

## Install

```
yarn add use-context-next
```

Do not forget to install peer dependencies.

## Usage

```typescript
import React from 'react';
import { createNextContext, useContextSelector } from 'use-context-next';
interface AppValue {
  firstName: string;
  lastName: string;
}

const defaultValue = {
  firstName: 'Ahmed',
  lastName: 'Bouhuolia',
};

const AppContext = createNextContext<AppValue>(defaultValue);

const useFirstName = () =>
  useContextSelector<AppValue, string>(AppContext, (value) => value.firstName);

const useLastName = () =>
  useContextSelector<AppValue, string>(AppContext, (value) => value.lastName);

export default function App() {
  return (
    <AppContext.Provider value={defaultValue}>
      <AppContentMemo />
    </AppContext.Provider>
  );
}

function AppContent() {
  return (
    <div>
      <FirstName />
      <LastName />
    </div>
  );
}

const AppContentMemo = React.memo(AppContent);

function FirstName() {
  const firstName = useFirstName();
  return <span>{firstName}</span>;
}

function LastName() {
  const lastName = useLastName();
  return <span>{lastName}</span>;
}
```

## FAQs

### When should we use Next Context instead of original Context API?

React Context isn't designed for state that change constantly because will destroy the perforamance and always adequate for global state that don't chnage in the runtime like theme variables, while Next Context designed to solve that performance issue, so if you want to use Context API to pass state and state was change the Next Context would ideal.

### Can we do deep comparison for consumers selector hooks?

When we designed the selector hook we kept it open to accept any comparator function the user want.

Example using `_.isEmpty` from `Lodash`.

```typescript
const useContextDeepSelector = <Value, Output>(
  context: React.Context,
  selector: (value: Value) => Output
) => useContextSelector<Value, Output>(context, selector, _.isEmpty);
```

## API

`createNextContext<Value>(defaultValue: Value)`

Creates and retrieves a Context object with `Provider` component.

Parameters:

- `defaultValue` any - Any default value to the context.

---

`useContextSelector<Value, Output>(context, selector, comparator)`

Retreives the context value by selector. Can only work if there's Provider above it and only re-render if that selected value is referentially changed.

Note: You can do shallow comparison for objects values by passing `_.isEqual` or any equalivent function to the third param of the hook.

Parameters:

- `context`: React.Context - The context object.
- `selector`: (value: Value) => Output - The context value selector.
- `comparator`: (value1: any, value2: any) => boolean - The comparator to detarmine when the hook should re-render.

---

Made by [Ahmed Bouhuolia](https://twitter.com/bouhuolia)
