import React, { useState } from "react";
import { Box, Tabs, Tab, IconButton, Checkbox } from "@mui/material";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TabLayer from './TabLayer';
import TabRegion from "./TabRegion";

const LopDuLieu = () => {
  const [value, setValue] = useState(0);

  return (
    <Box className="">
      <Tabs 
        value={value} 
        onChange={(e, newValue) => setValue(newValue)}
        variant="fullWidth"
        className="border-b"
        sx={{
          '& .MuiTab-root': {
            minHeight: '48px',
            fontWeight: 600,
            width: 150,
          }
        }}
      >
        <Tab 
          icon={<FuseSvgIcon size={20}>heroicons-outline:map</FuseSvgIcon>} 
          label="Lớp dữ liệu" 
        />
        <Tab 
          icon={<FuseSvgIcon size={20}>heroicons-outline:globe-alt</FuseSvgIcon>} 
          label="Lọc hành chính" 
        />
      </Tabs>

      <Box >
        {value === 0 && <TabLayer />}
        {value === 1 && <TabRegion/>}
      </Box>
    </Box>
  );
};


export default LopDuLieu;