import React, { createContext, useState } from 'react';

export const ShowContext = createContext();

export const ShowProvider = (props) => {
  const [showAll, setShowAll] = useState(true);

  return (
    <ShowContext.Provider value={{ showAll, setShowAll }}>
      {props.children}
    </ShowContext.Provider>
  );
};

// needs to be incorporated here
// const sortTasks = () =>
// taskList.sort((a, b) => (a.isCompleted > b.isCompleted ? 1 : -1));
