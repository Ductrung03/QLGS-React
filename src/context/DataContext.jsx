import React, { createContext, useState, useContext } from 'react';

// Tạo Context
const DataContext = createContext();

// Provider cho Context
export const DataProvider = ({ children }) => {
    const [geoData, setGeoData] = useState([]);
    const [columns, setColumns] = useState([]);

    return (
        <DataContext.Provider value={{ geoData, setGeoData, columns, setColumns }}>
            {children}
        </DataContext.Provider>
    );
};

// Hook để sử dụng Context
export const useData = () => useContext(DataContext);
