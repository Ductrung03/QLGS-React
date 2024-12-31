import React, { useState } from 'react';
import { Box, Checkbox, IconButton, Button, FormControl, FormControlLabel, TextField, Select, MenuItem, ListItemText } from "@mui/material";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'; 



const PhatHienBienDongRungTabComponent = ({ onClose }) => {
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [selectedHuyens, setSelectedHuyens] = useState([]);
    const [selectedxas, setSelectedxas] = useState([]);
    const [showMap, setShowMap] = useState(false);
    
    const forestLayers = [];

    const huyen = [
        {id: '1', name: 'Thành phố Tuyên Quang' },
        {id: '2', name: 'Huyện Lâm Bình' },
        {id: '3', name: 'Huyện Na Hang' },
    ];

    const handleSelectAll = (type) => {
        if (type === 'layers') {
            setSelectedLayers(selectedLayers.length === forestLayers.length ? [] : forestLayers.map(item => item.name));
        } else if (type === 'huyen') {
            setSelectedHuyens(selectedHuyens.length === huyen.length ? [] : huyen.map(item => item.name));
        } else if (type === 'xa') {
            setSelectedxas(selectedxas.length === xa.length ? [] : xa.map(item => item.name));
        }
    };

    const handleSingleSelect = (value, type) => {
        if (type === 'layers') {
            const newSelected = selectedLayers.includes(value) 
                ? selectedLayers.filter(item => item !== value)
                : [...selectedLayers, value];
            setSelectedLayers(newSelected);
        } else if (type === 'huyen') {
            const newSelected = selectedHuyens.includes(value)
                ? selectedHuyens.filter(item => item !== value)
                : [...selectedHuyens, value];
            setSelectedHuyens(newSelected);
        }
    };

    const handleCalculate = () => {
        setShowMap(true);
    };

    const handleReset = () => {
        setSelectedLayers([]);
        setSelectedHuyens([]);
        setSelectedxas([]);
        setShowMap(false);
    };

    const renderSelect = (type, value, data, label) => (
        <FormControl fullWidth>
            <label className="mb-2 font-medium">{label}:</label>
            <Select
                multiple
                value={value}
                displayEmpty
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>Lựa chọn...</em>;
                    }
                    return selected.join(', ');
                }}
                size='small'
            >
                <MenuItem>
                    <Checkbox 
                        checked={value.length === data.length}
                        indeterminate={value.length > 0 && value.length < data.length}
                        onChange={() => handleSelectAll(type)}
                    />
                    <ListItemText primary="Chọn tất cả" />
                </MenuItem>
                <MenuItem divider />
                {data.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                        <Checkbox checked={value.includes(item.name)} />
                        <ListItemText primary={item.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <div className="flex h-full">
            {/* Panel điều khiển */}
            <div className="flex flex-col w-[280px] border-r bg-white">
                <div className="top-heading-wrap">
                    <div className="flex justify-between items-center bg-primary-50 p-4 border-b-2 border-b-black">
                        <span className="font-semibold text-lg">Phát hiện biến động rừng</span>
                        <IconButton size="small" onClick={onClose}>
                            <FuseSvgIcon size={20}>heroicons-outline:x-circle</FuseSvgIcon>
                        </IconButton>
                    </div>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="space-y-4">
                        {renderSelect('huyens', selectedHuyens, huyen, 'Huyện')}
                        {renderSelect('layers', selectedLayers, forestLayers, 'Chọn ảnh thời kỳ trước')}
                        {renderSelect('layers', selectedLayers, forestLayers, 'Chọn ảnh thời kỳ sau')}
                    </div>
                    <div className="mt-4">
                        <label className="mb-2 font-medium block">Giá trị lô tối thiểu (ha):</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập giá trị...."
                            variant="outlined"
                            size="small"
                        />
                    </div>
                </div>

                <div className="border-t bg-white p-4">
                    <div className="flex justify-center">
                        <Button
                            variant="contained"
                            className='bg-amber-400 mr-4'
                            onClick={handleCalculate}
                        >
                            Tính toán
                        </Button>
                        <Button
                            variant="contained"
                            className='bg-blue-600'
                            onClick={handleReset}
                        >
                            Làm mới
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhatHienBienDongRungTabComponent;