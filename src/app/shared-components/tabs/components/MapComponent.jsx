import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import georaster from 'georaster';
import { useMap } from 'src/context/MapContext';


const MapComponent = () => {
    const mapRef = useRef(null);
    const layerRef = useRef(null);

    const { geoTiffFile, mapPosition, setMapPosition, zoomLevel, setZoomLevel } = useMap();

    useEffect(() => {
        if (!mapRef.current) {
            // Tạo map nếu chưa có
            mapRef.current = L.map('map').setView(mapPosition, zoomLevel);

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(mapRef.current);

            // Lưu vị trí và zoom khi bản đồ thay đổi
            mapRef.current.on('moveend', () => {
                const { lat, lng } = mapRef.current.getCenter();
                setMapPosition([lat, lng]);
                setZoomLevel(mapRef.current.getZoom());
            });
        }

        if (geoTiffFile) {
            console.log('Loading GeoTIFF File:', geoTiffFile);

            // Xóa layer cũ nếu có
            if (layerRef.current) {
                mapRef.current.removeLayer(layerRef.current);
            }

            // Tải và thêm GeoTIFF layer mới
            fetch(geoTiffFile)
                .then((response) => response.arrayBuffer())
                .then((arrayBuffer) => georaster(arrayBuffer))
                .then((georaster) => {
                    const layer = new GeoRasterLayer({
                        georaster,
                        opacity: 0.7,
                        resolution: 256,
                    });
                    layer.addTo(mapRef.current);
                    layerRef.current = layer;

                    mapRef.current.fitBounds(layer.getBounds());
                })
                .catch((error) => {
                    console.error('Error loading GeoTIFF:', error);
                });
        }
    }, [geoTiffFile]); // Chạy lại khi geoTiffFile thay đổi

    return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;
