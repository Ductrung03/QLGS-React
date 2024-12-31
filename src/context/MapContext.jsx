// frontend/src/context/MapContext.js

import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [geoTiffFile, setGeoTiffFile] = useState(null); // URL của file GeoTIFF
    const [mapPosition, setMapPosition] = useState([21.0285, 105.8542]); // Hà Nội (mặc định)
    const [zoomLevel, setZoomLevel] = useState(13); // Mức zoom mặc định

    // Dữ liệu cho BieuDoBaoCaoComponent
    const [geoData, setGeoData] = useState([]); // Dữ liệu GeoJSON
    const [columns, setColumns] = useState([]); // Cấu trúc cột bảng

    // Trạng thái lỗi hoặc thông báo toàn cục (nếu cần dùng chung)
    const [error, setError] = useState('');

    return (
        <MapContext.Provider
            value={{
                geoTiffFile,
                setGeoTiffFile,
                mapPosition,
                setMapPosition,
                zoomLevel,
                setZoomLevel,
                geoData,
                setGeoData,
                columns,
                setColumns,
                error,
                setError,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => useContext(MapContext);
