// frontend/src/components/BieuDoBaoCaoComponent.jsx

import React, { useState } from 'react';
import { useMap } from 'src/context/MapContext';
import { FixedSizeList as List } from 'react-window';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // Import CSS cho Tooltip

const Row = ({ index, style, data }) => {
    const { geoData, columns } = data;
    const row = geoData[index];
    const [tooltipContent, setTooltipContent] = useState('');

    return (
        <div
            style={{
                ...style,
                display: 'flex',
                borderBottom: '1px solid #ddd',
                alignItems: 'flex-start',
                boxSizing: 'border-box',
            }}
        >
            {columns.map((col) => (
                <div
                    key={col.id}
                    style={{
                        width: col.width,
                        padding: '8px',
                        borderRight: '1px solid #ddd',
                        whiteSpace: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordWrap: 'break-word',
                        boxSizing: 'border-box',
                        position: 'relative',
                    }}
                    data-tooltip-id={col.id === 'geometry' ? `tooltip-${index}` : undefined}
                    data-tooltip-content={col.id === 'geometry' ? JSON.stringify(row[col.id], null, 2) : undefined}
                >
                    {col.id === 'geometry'
                        ? row[col.id]?.type || 'N/A' // Hiển thị loại Geometry
                        : (typeof row[col.id] === 'object'
                            ? JSON.stringify(row[col.id])
                            : row[col.id] || 'N/A')}
                    {col.id === 'geometry' && row[col.id] && (
                        <Tooltip id={`tooltip-${index}`} place="top" type="dark" effect="solid" />
                    )}
                </div>
            ))}
        </div>
    );
};

const BieuDoBaoCaoComponent = () => {
    const { geoData, columns: existingColumns } = useMap();

    const additionalColumns = [
        { id: 'tt', label: 'TT', width: 60 },
        { id: 'loCB', label: 'Loại CB', width: 100 },
        { id: 'dtich', label: 'Diện tích', width: 100 },
        { id: 'mahuyen', label: 'Mã Huyện', width: 100 },
        { id: 'maxa', label: 'Mã Xã', width: 100 },
        { id: 'huyen', label: 'Huyện', width: 120 },
        { id: 'xa', label: 'Xã', width: 120 },
        { id: 'tk', label: 'TK', width: 100 },
        { id: 'khoanh', label: 'Khoanh', width: 100 },
        { id: 'ldlr', label: 'LDLR', width: 100 },
        { id: 'sldlr', label: 'SLDLR', width: 100 },
        { id: 'namtr', label: 'Năm TR', width: 100 },
        { id: 'malr3', label: 'Ma LR3', width: 100 },
        { id: 'churung', label: 'Chu Rừng', width: 150 },
        { id: 'X', label: 'X', width: 80 },
        { id: 'Y', label: 'Y', width: 80 },
        { id: 'tincay', label: 'Tin Cây', width: 100 },
        { id: 'xacminh', label: 'Xác Minh', width: 100 },
        { id: 'ngnhan', label: 'NgNhan', width: 120 },
        { id: 'ghichu', label: 'Ghi Chú', width: 150 },
        { id: 'geometry', label: 'Geometry', width: 150 },
        { id: 'dtype', label: 'Dtype', width: 100 },
    ];

    const formattedExistingColumns = existingColumns.map((col) => ({
        ...col,
        width: col.width || 120,
    }));

    const combinedColumns = [...formattedExistingColumns, ...additionalColumns];

    if (!geoData || geoData.length === 0 || combinedColumns.length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Chưa có dữ liệu để hiển thị</div>;
    }

    const itemData = { geoData, columns: combinedColumns };

    return (
        <div style={{ margin: '20px auto', width: '100%', overflowX: 'auto' }}>
            {/* Tiêu đề bảng */}
            <div style={{ display: 'flex', backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}>
                {combinedColumns.map((col) => (
                    <div
                        key={col.id}
                        style={{
                            width: col.width,
                            padding: '8px',
                            borderRight: '1px solid #ddd',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            whiteSpace: 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordWrap: 'break-word',
                            boxSizing: 'border-box',
                        }}
                    >
                        {col.label}
                    </div>
                ))}
            </div>
            {/* Danh sách dữ liệu */}
            <List
                height={500}
                itemCount={geoData.length}
                itemSize={50}
                width={combinedColumns.reduce((total, col) => total + col.width, 0) + 20}
                itemData={itemData}
            >
                {Row}
            </List>
        </div>
    );
};

export default BieuDoBaoCaoComponent;
