# Next Context

Next Context is a performance optimized subscriber with same React Context API design.

There's a performance issue in using React Context when the value of `Context.Provider` mutating all subscribers using `useContext` will re-render even if the component wasn't using the same mutated value because the `useContext` retrieves a object any mutations to that object leads to create a new one with different reference and cause re-rendering for all subscribe hooks, there's no any way to select specific value in the React Context.

We solved that problem by adding another hook `useContextSelector` gives us ability to split the object to values by selector, don't affect on each other when mutate them and the component will re-render if the value of context selector is changed.

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

Frankly React Context is not designed for state that changing constantly because it'll destroy the perforamance and always adequate for global state that don't mutate in the runtime like theme variables, while Next Context designed to solve that performance issue, so if you want to use Context API and state was changing after initial rendering the Next Context would ideal.

### Can we do deep comparison for consumers selector hooks?

When we designed the selector hook we kept it open to accept any compatator function the user want.

Example using `_.isEmpty` from Lodash.

```typescript
const useContextDeepSelector = <Value, Output>(
  context: React.Context,
  selector: (value: Value) => Output
) => useContextSelector<Value, Output>(context, selector, _.isEmpty);
```

## API

`createNextContext<Value>(defaultValue: Value)`

Creates a Context object and retrieves Context object with Provider.

Parameters:

- `defaultValue` any - Any default value to the context.

---

`useContextSelector<Value, Output>(context, selector, comparator)`

Retreives the context value by selector. Can only work if there's above it and only re-render if that selected value is referentially changed.

Note: You can do shallow comparison for objects values by passing `_.isEqual` or any equalivent function to the third param of the hook.

Parameters:

- `context` React.Context - The context object.
- `selector` (value: Value) => Output - The context value selector.
- `comparator`: (value1: any, value2: any) => boolean - The comparator to detarmine when the hook should re-render.

---

Made by [Ahmed Bouhuolia](https://twitter.com/bouhuolia)
