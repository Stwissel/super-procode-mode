import React from 'react';
import './App.css';
import DemoRating from './components/DemoRating';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Demo Rating</h1>
      </header>
      <main>
        <DemoRating stars={5} score={3} size={'24px'} />
      </main>
    </div>
  );
}

export default App;
