import React, { createContext, useState } from 'react';

export const ShowContext = createContext();

export const ShowProvider = (props) => {
  const [showAll, setShowAll] = useState(true);
  const sortList = (taskList) => {
    setShowAll(!showAll);
    return taskList.sort((a, b) => (a.isCompleted < b.isCompleted ? -1 : 1));
  };

  return (
    <ShowContext.Provider value={{ showAll, sortList }}>
      {props.children}
    </ShowContext.Provider>
  );
};
