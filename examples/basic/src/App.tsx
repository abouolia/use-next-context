import React from 'react';
import { createNextContext, useContextSelector } from 'use-context-next';
import './App.css';

interface Value {
  ball6: string;
  ball5: string;
  ball4: string;
  ball3: string;
  ball2: string;
  ball1: string;
}

const AppProvider = createNextContext<Value>({
  ball1: 'red',
  ball2: 'green',
  ball3: 'red',
  ball4: 'green',
  ball5: 'red',
  ball6: 'green',
});

const useBall1 = () =>
  useContextSelector<Value, string>(AppProvider, (value) => value.ball1);

const useBall2 = () =>
  useContextSelector<Value, string>(AppProvider, (value) => value.ball2);

const useBall3 = () =>
  useContextSelector<Value, string>(AppProvider, (value) => value.ball3);

const useBall4 = () =>
  useContextSelector<Value, string>(AppProvider, (value) => value.ball4);

const useBall5 = () =>
  useContextSelector<Value, string>(AppProvider, (value) => value.ball5);

const useBall6 = () =>
  useContextSelector<Value, string>(AppProvider, (value) => value.ball6);

const toggleColor = (oldValue: string) =>
  oldValue === 'green' ? 'red' : 'green';

function App() {
  const [value, setValue] = React.useState<Value>({
    ball1: 'red',
    ball2: 'green',
    ball3: 'red',
    ball4: 'green',
    ball5: 'red',
    ball6: 'green',
  });
  const handleClick = () => {
    setValue({
      ball1: toggleColor(value.ball1),
      ball2: value.ball2,
      ball3: toggleColor(value.ball3),
      ball4: value.ball4,
      ball5: toggleColor(value.ball5),
      ball6: value.ball6,
    });
  };
  const handleOddClick = () => {
    setValue({
      ball1: value.ball1,
      ball2: toggleColor(value.ball2),
      ball3: value.ball3,
      ball4: toggleColor(value.ball4),
      ball5: value.ball5,
      ball6: toggleColor(value.ball6),
    });
  };
  return (
    <AppProvider.Provider value={value}>
      <AppContentMemo />
      <button onClick={handleClick}>Switch Odd Balls</button>
      <button onClick={handleOddClick}>Switch Even Balls</button>
    </AppProvider.Provider>
  );
}

function AppContent() {
  return (
    <div className={'balls'}>
      <Ball1 />
      <Ball2 />
      <Ball3 />
      <Ball4 />
      <Ball5 />
      <Ball6 />
    </div>
  );
}

const AppContentMemo = React.memo(AppContent);

function Ball1() {
  const ball1Color = useBall1();

  return <div className={'ball'} style={{ backgroundColor: ball1Color }} />;
}

function Ball2() {
  const ball2Color = useBall2();

  return <div className={'ball'} style={{ backgroundColor: ball2Color }} />;
}

function Ball3() {
  const ball3Color = useBall3();

  return <div className={'ball'} style={{ backgroundColor: ball3Color }} />;
}

function Ball4() {
  const ball4Color = useBall4();

  return <div className={'ball'} style={{ backgroundColor: ball4Color }} />;
}

function Ball5() {
  const ball5Color = useBall5();

  return <div className={'ball'} style={{ backgroundColor: ball5Color }} />;
}

function Ball6() {
  const ball6Color = useBall6();

  return <div className={'ball'} style={{ backgroundColor: ball6Color }} />;
}

export default App;
