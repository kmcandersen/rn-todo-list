import React from 'react';
import { TasksProvider } from './contexts/TasksContext';
import Main from './screens/Main';

function App() {
  return (
    <TasksProvider>
      <Main />
    </TasksProvider>
  );
}

export default App;
