import { useState } from 'react';
import {
  createNextContext,
  useNextContextSelector,
} from '../ContextNext/ContextNextProvider';

export const ExampleContext = createNextContext({});

export function Example() {
  const [value, setValue] = useState({
    firstName: 'Ahmed',
    lastName: 'Mohamed',
  });

  const onClick = () => {
    setValue({
      firstName: 'asdfasdf',
    });
  };

  return (
    <ExampleContext.Provider value={value}>
      <h1>asdasdasd</h1>
      <button onClick={onClick}>Click Me</button>
      <SubComponent />
    </ExampleContext.Provider>
  );
}

function SubComponent() {
  const state = useNextContextSelector(
    ExampleContext,
    (value) => value.firstName
  );

  console.log(state, 'XXXX');

  return <h1>Ahmed</h1>;
}
