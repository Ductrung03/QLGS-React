// src/app/store/tabContext/TabContext.js
import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export function TabProvider({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}