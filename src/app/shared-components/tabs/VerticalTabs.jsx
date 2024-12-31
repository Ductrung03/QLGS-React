import React, { useState } from 'react';
import { Tabs, Tab, Box, Tooltip } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import LopDuLieu from './components/LopDuLieu';
import TimKiem from './components/TimKiem';

import BienDongRung from './components/BienDongRung';

import { useNavigate, useLocation } from 'react-router-dom';
import PhatHienBienDongRungTab from './components/PhatHienBienDongRungTabComponent';
import PhatHienBienDongRung from 'src/app/main/giam-sat-mat-rung/phat-hien-bien-dong-rung/PhatHienBienDongRung';

const VerticalTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Map routes to tab indexes
  const routeToIndex = {
    '/example/lop-du-lieu': 0,
    '/example/tim-kiem': 1,
    '/example/phat-hien-bien-dong': 2,
    '/example/bien-dong-rung': 3,
    '/example/map': 4,
    '/example/chu-giai': 5
  };

  // Get current tab from route
  const currentTab = routeToIndex[location.pathname] || 0;

  const handleChange = (event, newValue) => {
    // Map tab indexes to routes
    const routes = [
      '/example/lop-du-lieu',
      '/example/tim-kiem',
      '/example/phat-hien-bien-dong',
      '/example/bien-dong-rung',
      '/example/map',
      '/example/chu-giai'
    ];
    navigate(routes[newValue]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        position: 'relative',
        justifyContent: 'flex-start',
      }}
    >
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={handleChange}
        sx={{
          borderRight: 2,
          borderColor: 'divider',
          minWidth: '80px',
          flexShrink: 0,
          height: '100%',
        }}
      >
        <Tooltip title="Lớp dữ liệu" placement="right">
          <Tab
            icon={<FuseSvgIcon size={24} color="action">heroicons-outline:view-boards</FuseSvgIcon>}
          />
        </Tooltip>
        <Tooltip title="Tìm kiếm" placement="right">
          <Tab
            icon={<FuseSvgIcon className="text-48" size={24} color="action">feather:search</FuseSvgIcon>}
          />
        </Tooltip>
        <Tooltip title="Phát hiện biến động rừng" placement="right">
          <Tab
            icon={<FuseSvgIcon size={24} color="action">heroicons-outline:view-grid-add</FuseSvgIcon>}
          />
        </Tooltip>
        <Tooltip title="Biến động rừng" placement="right">
          <Tab
            icon={<FuseSvgIcon className="text-48" size={24} color="action">material-solid:waves</FuseSvgIcon>}
          />
        </Tooltip>
        <Tooltip title="Danh sách ảnh kèm tọa độ" placement="right">
          <Tab
            icon={<FuseSvgIcon className="text-48" size={24} color="action">material-outline:broken_image</FuseSvgIcon>}
          />
        </Tooltip>
        <Tooltip title="Chú giải" placement="right">
          <Tab
            icon={<FuseSvgIcon className="text-48" size={24} color="action">feather:edit</FuseSvgIcon>}
          />
        </Tooltip>
      </Tabs>

      <Box
        sx={{
          flexGrow: 1,
          height: '100%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        > 
          {location.pathname === '/example/lop-du-lieu' && <LopDuLieu />}
          {location.pathname === '/example/tim-kiem' && <TimKiem/>}
          {location.pathname === '/example/phat-hien-bien-dong' && <PhatHienBienDongRungTab/>}
          {location.pathname === '/example/bien-dong-rung' && <BienDongRung />}
          {location.pathname === '/example/map' && <PhatHienBienDongRung />}
          {location.pathname === '/example/chu-giai' && <div>Content of Item Three</div>}
        </Box>
      </Box>
    </Box>
  );
};

export default VerticalTabs;