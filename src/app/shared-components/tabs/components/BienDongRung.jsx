import React, { useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Button,
  FormControl,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

import dayjs from "dayjs";
import "dayjs/locale/vi";

const BienDongRung = () => {
  const [selectedLayers, setSelectedLayers] = useState([]);

  const [selectedHuyens, setSelectedHuyens] = useState([]);
  const [selectedxas, setSelectedxas] = useState([]);
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(30, "day")]);

  const forestLayers = [];

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };
  const huyen = [
    { id: "1", name: "Thành phố Tuyên Quang" },
    { id: "2", name: "Huyện Lâm Bình" },
    { id: "3", name: "Huyện Na Hang" },
  ];

  const handleSelectAll = (type) => {
    if (type === "layers") {
      setSelectedLayers(
        selectedLayers.length === forestLayers.length
          ? []
          : forestLayers.map((item) => item.name)
      );
    } else if (type === "huyen") {
      setSelectedHuyens(
        selectedHuyens.length === huyen.length
          ? []
          : huyen.map((item) => item.name)
      );
    } else if (type === "xa") {
      setSelectedxas(
        selectedxas.length === xa.length ? [] : xa.map((item) => item.name)
      );
    }
  };

  const handleSingleSelect = (value, type) => {
    if (type === "layers") {
      const newSelected = selectedLayers.includes(value)
        ? selectedLayers.filter((item) => item !== value)
        : [...selectedLayers, value];
      setSelectedLayers(newSelected);
    } else if (type === "huyen") {
      const newSelected = selectedHuyens.includes(value)
        ? selectedHuyens.filter((item) => item !== value)
        : [...selectedHuyens, value];
      setSelectedHuyens(newSelected);
    }
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
          return selected.join(", ");
        }}
        size="small"
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
    <div className="flex flex-col w-[280px]">
      <div className="top-heading-wrap mb-10">
        <div className="flex justify-between items-center bg-primary-50 p-4 border-b-2 border-b-black">
          <span className="font-semibold text-lg">Biến động rừng</span>
          <IconButton size="small">
            <FuseSvgIcon size={20}>heroicons-outline:x-circle</FuseSvgIcon>
          </IconButton>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <div className="space-y-4">
          {renderSelect("huyens", selectedHuyens, huyen, "Huyện")}
          {renderSelect("layers", selectedLayers, forestLayers, "Xã")}
          <div className="mb-4">
            <label className="mb-2 font-medium block">
              Thời gian ghi nhận: <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <TextField
                label="Từ ngày"
                type="date"
                fullWidth
                size="small"
                value={dateRange[0].format("YYYY-MM-DD")}
                onChange={(e) =>
                  setDateRange([dayjs(e.target.value), dateRange[1]])
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Đến ngày"
                type="date"
                fullWidth
                size="small"
                value={dateRange[1].format("YYYY-MM-DD")}
                onChange={(e) =>
                  setDateRange([dateRange[0], dayjs(e.target.value)])
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            {renderSelect(
              "layers",
              selectedLayers,
              forestLayers,
              "Phân loại rừng"
            )}
            {renderSelect("layers", selectedLayers, forestLayers, "Loại rừng")}
          </div>
        </div>
        
      </div>

      <div className="border-t bg-white p-4 mt-7">
        <div className="flex justify-center ">
          
          <div>
            <Button variant="contained" className="bg-blue-600">
              Tra cứu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BienDongRung;
