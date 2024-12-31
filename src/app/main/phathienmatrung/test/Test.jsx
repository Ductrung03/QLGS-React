// frontend/src/components/Test.js

import React, { useState } from 'react';
import { useMap } from 'src/context/MapContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BieuDoBaoCaoComponent from '../../bao-cao/components/BieuDoBaoCaoComponent';
import MapComponent from 'app/shared-components/tabs/components/MapComponent';


const Test = () => {
    const [geoTiffUrlInput, setGeoTiffUrlInput] = useState('');
    const [loading, setLoading] = useState(false);

    const { setGeoTiffFile, geoData, setGeoData, setColumns } = useMap();

    const handleInputChange = (e) => {
        setGeoTiffUrlInput(e.target.value);
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleLoadFile = async () => {
        if (!geoTiffUrlInput || !isValidUrl(geoTiffUrlInput)) {
            toast.error('Vui lòng nhập đường dẫn GeoTIFF hợp lệ.');
            return;
        }

        setLoading(true);
        setGeoData([]); // Reset dữ liệu

        try {
            const response = await fetch('http://localhost:5000/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: geoTiffUrlInput }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                const message = errorResponse.error || 'Unknown error';
                throw new Error(message);
            }

            const result = await response.json();
            if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
                throw new Error('Dữ liệu trả về không hợp lệ từ server.');
            }

            // Cập nhật cột và dữ liệu
            const generatedColumns = Object.keys(result.data[0]).map((key) => ({
                id: key,
                label: key.charAt(0).toUpperCase() + key.slice(1), // Viết hoa chữ cái đầu
            }));

            setGeoTiffFile(result.geoTiffUrl); // Lưu URL GeoTIFF
            setColumns(generatedColumns); // Cập nhật cột
            setGeoData(result.data); // Cập nhật dữ liệu
            toast.success('File đã được tải và xử lý thành công!');
        } catch (error) {
            console.error('Error:', error);
            toast.error(`Không thể tải file. Chi tiết: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <ToastContainer />
            {/* Input URL */}
            <input
                type="text"
                placeholder="Dán đường dẫn GeoTIFF vào đây"
                value={geoTiffUrlInput}
                onChange={handleInputChange}
                style={{
                    width: '80%',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <br />
            {/* Button tải file */}
            <button
                onClick={handleLoadFile}
                style={{
                    padding: '10px 20px',
                    backgroundColor: loading ? '#ccc' : '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}
                disabled={loading}
            >
                {loading ? 'Đang tải...' : 'Tải file'}
            </button>

            

            {/* Responsive Iframe */}
            <div style={{ marginTop: '20px' }}>
                <iframe
                    src="https://ee-phulektqs53.projects.earthengine.app/view/bathymetry"
                    style={{
                        width: '100%',
                        height: '650px',
                        borderRadius: '10px',
                        border: '1px solid #ccc',
                    }}
                    frameBorder="0"
                    allowFullScreen
                    title="Phân tích mất rừng"
                />
            </div>
        </div>
    );

};

export default Test;
