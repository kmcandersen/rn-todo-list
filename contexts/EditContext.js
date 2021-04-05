import React, { createContext, useState } from 'react';

export const EditContext = createContext();

export const EditProvider = (props) => {
  // stores Task id (a string)
  const [editItem, setEditItem] = useState('');

  return (
    <EditContext.Provider value={{ editItem, setEditItem }}>
      {props.children}
    </EditContext.Provider>
  );
};
