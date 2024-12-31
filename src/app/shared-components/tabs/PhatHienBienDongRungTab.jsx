import React, { useState } from "react";
import { Tabs, Tab, Box, Tooltip } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import LopDuLieu from "./components/LopDuLieu";
import TimKiem from "./components/TimKiem";

import BienDongRung from "./components/BienDongRung";

import { useNavigate, useLocation } from "react-router-dom";
import PhatHienBienDongRungTabComponent from "./components/PhatHienBienDongRungTabComponent";
import PhatHienBienDongRung from "src/app/main/giam-sat-mat-rung/phat-hien-bien-dong-rung/PhatHienBienDongRung";

const PhatHienBienDongRungTab = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Map routes to tab indexes
  const routeToIndex = {
    "/giam-sat-mat-rung/phat-hien-bien-dong/lop-du-lieu": 0,
    "/giam-sat-mat-rung/phat-hien-bien-dong/tim-kiem": 1,
    "/giam-sat-mat-rung/phat-hien-bien-dong/phat-hien-bien-dong": 2,
    "/giam-sat-mat-rung/phat-hien-bien-dong/bien-dong-rung": 3,
    "/giam-sat-mat-rung/phat-hien-bien-dong/map": 4,
    "/giam-sat-mat-rung/phat-hien-bien-dong/chu-giai": 5,
  };

  // Get current tab from route
  const currentTab = routeToIndex[location.pathname] || 0;

  const handleChange = (event, newValue) => {
    // Map tab indexes to routes
    const routes = [
      "/giam-sat-mat-rung/phat-hien-bien-dong/lop-du-lieu",
      "/giam-sat-mat-rung/phat-hien-bien-dong/tim-kiem",
      "/giam-sat-mat-rung/phat-hien-bien-dong/phat-hien-bien-dong",
      "/giam-sat-mat-rung/phat-hien-bien-dong/bien-dong-rung",
      "/giam-sat-mat-rung/phat-hien-bien-dong/map",
      "/giam-sat-mat-rung/phat-hien-bien-dong/chu-giai",
    ];
    navigate(routes[newValue]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={handleChange}
        sx={{
          minWidth: 48,
          width: 48,
          borderRight: 0,
          "& .MuiTab-root": {
            minWidth: 48,
            width: 48,
            minHeight: 48,
            padding: 0,
            marginBottom: 1,
          },
        }}
      >
        <Tab
          icon={
            <Tooltip title="Lớp dữ liệu" placement="right">
              <FuseSvgIcon size={24} color="action">
                heroicons-outline:view-boards
              </FuseSvgIcon>
            </Tooltip>
          }
        />

        <Tab
          icon={
            <Tooltip title="Tìm kiếm" placement="right">
              <FuseSvgIcon className="text-48" size={24} color="action">
                feather:search
              </FuseSvgIcon>
            </Tooltip>
          }
        />

        <Tab
          icon={
            <Tooltip title="Phát hiện biến động rừng" placement="right">
              <FuseSvgIcon size={24} color="action">
                heroicons-outline:view-grid-add
              </FuseSvgIcon>
            </Tooltip>
          }
        />

        <Tab
          icon={
            <Tooltip title="Biến động rừng" placement="right">
              <FuseSvgIcon className="text-48" size={24} color="action">
                material-solid:waves
              </FuseSvgIcon>
            </Tooltip>
          }
        />

        <Tab
          icon={
            <Tooltip title="Danh sách ảnh kèm tọa độ" placement="right">
              <FuseSvgIcon className="text-48" size={24} color="action">
                material-outline:broken_image
              </FuseSvgIcon>
            </Tooltip>
          }
        />

        <Tab
          icon={
            <Tooltip title="Chú giải" placement="right">
              <FuseSvgIcon className="text-48" size={24} color="action">
                feather:edit
              </FuseSvgIcon>
            </Tooltip>
          }
        />
      </Tabs>
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {location.pathname ===
          "/giam-sat-mat-rung/phat-hien-bien-dong/lop-du-lieu" && <LopDuLieu />}
        {location.pathname ===
          "/giam-sat-mat-rung/phat-hien-bien-dong/tim-kiem" && <TimKiem />}
        {location.pathname ===
          "/giam-sat-mat-rung/phat-hien-bien-dong/phat-hien-bien-dong" && (
          <PhatHienBienDongRungTabComponent />
        )}
        {location.pathname ===
          "/giam-sat-mat-rung/phat-hien-bien-dong/bien-dong-rung" && (
          <BienDongRung />
        )}
        {location.pathname === "/giam-sat-mat-rung/phat-hien-bien-dong/map" && (
          <PhatHienBienDongRung />
        )}
        {location.pathname ===
          "/giam-sat-mat-rung/phat-hien-bien-dong/chu-giai" && (
          <div>Content of Item Three</div>
        )}
      </Box>
    </Box>
  );
};

export default PhatHienBienDongRungTab;
