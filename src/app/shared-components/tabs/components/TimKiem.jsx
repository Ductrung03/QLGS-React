import React, { useState } from 'react';
import { Box, Checkbox, IconButton, Button, FormControl, FormControlLabel, TextField, Select, MenuItem, CssBaseline, ListItemText } from "@mui/material";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';




const TimKiem = () => {
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [includeGeometry, setIncludeGeometry] = useState(false);
    const [selectedHuyens, setSelectedHuyens] = useState([]);
    const [selectedxas, setSelectedxas] = useState([]);
    const check = selectedLayers.length > 0;
    const forestLayers = [
        { id: '1', name: 'Hotspot 2021-2023' },
        { id: '2', name: 'Thủy hệ - Vùng' },
        { id: '3', name: 'HTR - Theo DBR 2022' },
        { id: '4', name: 'Biến động rừng' }
    ];

    const huyen =[
        {id: '1', name: 'Thành phố Tuyên Quang' },
        {id: '2', name: 'Huyện Lâm Bình' },
        {id: '3', name: 'Huyện Na Hang' },

    ];
    const xa =[
        {id: '1', name: 'Không có dữ liệu'}
    ]
    const handleSelectAll = (type) => {
        if (type === 'layers') {
            if (selectedLayers.length === forestLayers.length) {
                setSelectedLayers([]);
            } else {
                setSelectedLayers(forestLayers.map(item => item.name));
            }
        } else if (type === 'huyen') {
            if (selectedHuyens.length === huyen.length) {
                setSelectedHuyens([]);
            } else {
                setSelectedHuyens(huyen.map(item => item.name));
            }
        }
        else if (type === 'xa') {
            if (selectedxas.length === xa.length) {
                setSelectedxas([]);
            } else {
                setSelectedxas(xa.map(item => item.name));
            }
        }
    };

    const handleSingleSelect = (value, type) => {
        if (type === 'layers') {
            const newSelected = [...selectedLayers];
            const index = newSelected.indexOf(value);
            if (index === -1) {
                newSelected.push(value);
            } else {
                newSelected.splice(index, 1);
            }
            setSelectedLayers(newSelected);
        } else if (type === 'huyen') {
            const newSelected = [...selectedHuyens];
            const index = newSelected.indexOf(value);
            if (index === -1) {
                newSelected.push(value);
            } else {
                newSelected.splice(index, 1);
            }
            setSelectedHuyens(newSelected);
        }
    };

    const renderSelect = (type, value, data, label) => (
        <FormControl fullWidth>
            <label className="mb-2 font-medium">{label}:</label>
            <Select
                multiple
                value={value}
                renderValue={(selected) => selected.join(', ')}
                placeholder="Lựa chọn..."
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
                        <Checkbox 
                            checked={value.includes(item.name)}
                            onChange={() => handleSingleSelect(item.name, type)}
                        />
                        <ListItemText primary={item.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <div className="flex flex-col ">
            <div className="top-heading-wrap mb-10">
                <div className="flex justify-between items-center bg-primary-50 p-4 border-b-2 border-b-black">
                    <span className="font-semibold text-lg">Tìm kiếm</span>
                    <IconButton size="small">
                        <FuseSvgIcon size={20}>heroicons-outline:x-circle</FuseSvgIcon>
                    </IconButton>
                </div>
            </div>

            <div className="p-4 flex-1 overflow-auto">
                <div className="space-y-4">
                    {/* Lớp dữ liệu */}
                   
                     {renderSelect('layers', selectedLayers, forestLayers, 'Lớp dữ liệu')}

                    {/* Nội dung tìm kiếm */}
                    <div>
                        <label className="mb-2 font-medium block">Nội dung tìm kiếm:</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập nội dung tìm kiếm..."
                            variant="outlined"
                            size="small"
                        />
                    </div>

                    {/* Kết hợp tìm kiếm không gian */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={includeGeometry}
                                onChange={(e) => setIncludeGeometry(e.target.checked)}
                            />
                        }
                        label="Kết hợp tìm kiếm không gian"
                    />

                    {/* Loại và Bán kính */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 font-medium block">Loại:</label>
                            <Select
                                fullWidth
                                disabled={!includeGeometry}
                                placeholder="Lựa chọn..."
                                size="small"
                            >
                                <MenuItem value="circle">Hình tròn</MenuItem>
                                <MenuItem value="polygon">Đa giác</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2 font-medium block">Bán kính (km):</label>
                            <TextField
                                fullWidth
                                type="number"
                                disabled={!includeGeometry}
                                defaultValue={1}
                                size="small"
                                InputProps={{
                                    inputProps: { min: 0, max: 100 }
                                }}
                            />
                        </div>
                    </div>
                </div>

               
            </div>
            
            
            
            {check && (

                <div className='mb-20 '>
                <div className="top-heading-wrap mt-10">
                    <div className="flex justify-between items-center bg-primary-50 p-4 border-b-2 border-b-black">
                        <span className="font-semibold text-xl">Thông tin bổ sung</span>
                       
                    </div>
                    <div className='mt-20 '>
                <div className="top-heading-wrap mt-10">
                    <div className="flex justify-between items-center bg-primary-50 p-4 border-b-2 border-b-black">
                        <span className="font-semibold text-xl">Địa phận hành chính</span>
                    </div>
                    {renderSelect('huyen', selectedHuyens, huyen, 'Huyện')}
                    {renderSelect('xa', selectedxas, xa, 'Xã')}
                </div>
            </div>
                </div>
            </div>
            
        )}
            {/* Fixed bottom toolbar */}
            <div className="border-t bg-white p-4">
                <div className="flex justify-center">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FuseSvgIcon className="text-48" size={24} color="white">feather:search</FuseSvgIcon>}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TimKiem;