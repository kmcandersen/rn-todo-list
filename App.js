import React from 'react';
import { EditProvider } from './contexts/EditContext';
import { ShowProvider } from './contexts/ShowContext';
import { TasksProvider } from './contexts/TasksContext';
import Main from './screens/Main';

function App() {
  return (
    <EditProvider>
      <ShowProvider>
        <TasksProvider>
          <Main />
        </TasksProvider>
      </ShowProvider>
    </EditProvider>
  );
}

export default App;
