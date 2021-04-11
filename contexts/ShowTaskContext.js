import React, { createContext, useState } from 'react';

export const ShowTaskContext = createContext();

export const ShowTaskProvider = (props) => {
  const [showAll, setShowAll] = useState(true);
  const sortList = (taskList) => {
    setShowAll(!showAll);
    return taskList.sort((a, b) => (a.isCompleted < b.isCompleted ? -1 : 1));
  };

  return (
    <ShowTaskContext.Provider value={{ showAll, sortList }}>
      {props.children}
    </ShowTaskContext.Provider>
  );
};
