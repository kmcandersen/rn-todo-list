// set to false when keyboard for Update field is open, so AddTask doesn't show above keyboard

import React, { createContext, useState } from 'react';

export const ShowAddContext = createContext();

export const ShowAddProvider = (props) => {
  const [showAddItem, setShowAddItem] = useState(true);

  return (
    <ShowAddContext.Provider value={{ showAddItem, setShowAddItem }}>
      {props.children}
    </ShowAddContext.Provider>
  );
};
