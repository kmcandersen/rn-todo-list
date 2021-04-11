import React from 'react';
import { EditProvider } from './contexts/EditContext';
import { ShowAddProvider } from './contexts/ShowAddContext';
import { ShowTaskProvider } from './contexts/ShowTaskContext';
import { TasksProvider } from './contexts/TasksContext';
import Main from './screens/Main';

function App() {
  return (
    <EditProvider>
      <ShowTaskProvider>
        <ShowAddProvider>
          <TasksProvider>
            <Main />
          </TasksProvider>
        </ShowAddProvider>
      </ShowTaskProvider>
    </EditProvider>
  );
}

export default App;
