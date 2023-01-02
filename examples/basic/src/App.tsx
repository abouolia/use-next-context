import React from 'react';
import { createNextContext, useContextSelector } from 'use-context-next';
import logo from './logo.svg';
import './App.css';

interface Value {
  firstName: string;
  lastName: string;
}

const AppProvider = createNextContext<Value>({
  firstName: 'Ahmed',
  lastName: 'Bouhuolia',
});
const useFirstName = () =>
  useContextSelector<Value, string>(AppProvider, (value) => value.firstName);

function App() {
  return (
    <div className="App">
      <AppProvider.Provider
        value={{ firstName: 'Ahmed', lastName: 'Bouhuolia' }}
      >
        <FirstName />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </AppProvider.Provider>
    </div>
  );
}

function FirstName() {
  const firstName = useFirstName();

  return <h1>{firstName}</h1>;
}

export default App;
