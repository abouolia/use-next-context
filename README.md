# React Next Context

Next Context is a performance optimized subscriber with same React Context API design.

There's a performance issue in using React Context when the `Context.Provider` value mutating all subscribers using `useContext` will re-render even if the component wasn't using that mutated value because the `useContext` retrieves a object any mutations to that object leads to create a new one with different reference and cause re-rendering for all hooks, there's no any way to select specific value in the React Context.

We solved that problem by adding another hook `useContextSelector` gives us ability to split the object to values by selector, don't affect on each other when mutate them and the component will re-render if the value of context selector is changed.

## Install

```
yarn add use-context-next
```

Depends on `react` as 

## Usage

<script src="https://gist.github.com/abouolia/1ee096d5a4df15c992c34886b9d56b56.js"></script>

## FAQs

## API

`createNextContext<Value>(defaultValue: Value)`

Creates a Context object and retrieves Context object with Provider.

Parameters:
- `defaultValue` any - Any default value to the context.

---

`useContextSelector<Value, Output>(context, selector, comparator)`

Retreives the context value by selector. Can only work if there's above it and only re-render if that selected value is referentially changed.

Note: You can do shallow comparison for objects values by passing _.isEqual or any equalivent function to the third param of the hook.

Parameters:
- `context` React.Context - The context object.
- `selector` (value: Value) => Output - The context value selector.
- `comparator`: (value1: any, value2: any) => boolean - The comparator to detarmine when the hook should re-render.

-----

Made by [Ahmed Bouhuolia](https://twitter.com/bouhuolia)
