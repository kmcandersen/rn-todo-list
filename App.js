import React from 'react';
import { TasksProvider } from './contexts/TasksContext';
import { EditProvider } from './contexts/EditContext';
import Main from './screens/Main';

function App() {
  return (
    <EditProvider>
      <TasksProvider>
        <Main />
      </TasksProvider>
    </EditProvider>
  );
}

export default App;
