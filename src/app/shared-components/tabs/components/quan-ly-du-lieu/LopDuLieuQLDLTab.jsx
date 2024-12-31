import React, { useState } from 'react';
import { Box, Tabs, Tab, IconButton, Checkbox } from "@mui/material";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const LopDuLieuQLDLTab = () => {
  const [expandedGroups, setExpandedGroups] = useState(["g_1"]);
  const [selectedLayers, setSelectedLayers] = useState([
    "l_15",
    "l_5",
    "lc_861",
    "lc_864",
    "lc_859",
    "lc_863",
    "lc_865",
    "lc_862",
  ]);

  // Data definitions remain the same...
  const baseLayers = [
    { id: "base_1", name: "Nền hành chính" },
    { id: "base_2", name: "Nền vệ tinh" },
  ];

  const danhSachAnhVeTinh = [
    { id: "si_10_2024", name: "Tháng 10/2024", hasActions: true },
    { id: "si_09_2024", name: "Tháng 09/2024", hasActions: true },
    { id: "si_08_2024", name: "Tháng 08/2024", hasActions: true },
    { id: "si_07_2024", name: "Tháng 07/2024", hasActions: true },
    { id: "si_06_2024", name: "Tháng 06/2024", hasActions: true },
    { id: "si_05_2024", name: "Tháng 05/2024", hasActions: true },
    { id: "si_04_2024", name: "Tháng 04/2024", hasActions: true },
    { id: "si_03_2024", name: "Tháng 03/2024", hasActions: true },
    { id: "si_02_2024", name: "Tháng 02/2024", hasActions: true },
    { id: "si_01_2024", name: "Tháng 01/2024", hasActions: true },
    { id: "si_12_2023", name: "Tháng 12/2023", hasActions: true },
    { id: "si_11_2023", name: "Tháng 11/2023", hasActions: true },
    { id: "si_10_2023", name: "Tháng 10/2023", hasActions: true },
    { id: "si_09_2023", name: "Tháng 09/2023", hasActions: true },
    { id: "si_08_2023", name: "Tháng 08/2023", hasActions: true },
    { id: "si_07_2023", name: "Tháng 07/2023", hasActions: true },
  ];

  const forestLayers = [
    {
      id: "l_14",
      name: "Hotspot 2021-2023",
      hasActions: true,
    },
    {
      id: "l_15",
      name: "Thủy hệ - Vùng",
      hasActions: true,
    },
    {
      id: "l_4",
      name: "HTR - Theo DBR 2022",
      hasActions: true,
      children: [
        { id: "lc_872", name: "PH" },
        { id: "lc_874", name: "SX" },
        { id: "lc_873", name: "DD" },
        { id: "lc_875", name: "Khác" },
      ],
    },
    {
      id: "l_5",
      name: "Biến động rừng",
      hasActions: true,
      children: [
        { id: "lc_861", name: "Rừng trồng non" },
        { id: "lc_864", name: "Rừng tự nhiên giàu" },
        { id: "lc_859", name: "Rừng tự nhiên trung bình" },
        { id: "lc_863", name: "Đất trống hoặc ít cây rừng" },
        { id: "lc_865", name: "Rừng trồng già" },
        { id: "lc_862", name: "Rừng tự nhiên nghèo" },
      ],
    },
  ];

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleLayer = (layerId) => {
    setSelectedLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
  };

  // Modified to handle nested layers
  const toggleGroupLayers = (group, layers) => {
    const getAllLayerIds = (layersList) => {
      return layersList.reduce((ids, layer) => {
        ids.push(layer.id);
        if (layer.children) {
          ids.push(...getAllLayerIds(layer.children));
        }
        return ids;
      }, []);
    };

    const layerIds = getAllLayerIds(layers);
    setSelectedLayers((prev) => {
      const groupSelected = layerIds.every((id) => prev.includes(id));
      if (groupSelected) {
        return prev.filter((id) => !layerIds.includes(id));
      } else {
        return [...new Set([...prev, ...layerIds])];
      }
    });
  };

  const LayerItem = ({ layer, indent = 0 }) => (
    <div
      className={`flex items-center px-2 py-1.5 hover:bg-gray-50 ${
        selectedLayers.includes(layer.id) ? "bg-blue-50 hover:bg-blue-100" : ""
      }`}
      style={{ paddingLeft: `${indent * 20}px` }}
    >
      <Checkbox
        checked={selectedLayers.includes(layer.id)}
        onChange={() => toggleLayer(layer.id)}
        size="small"
        className="mr-1"
      />
      <span className="flex-grow text-sm">{layer.name}</span>
      {layer.hasActions && (
        <IconButton size="small" className="text-gray-500">
          <FuseSvgIcon size={20}>heroicons-outline:dots-vertical</FuseSvgIcon>
        </IconButton>
      )}
    </div>
  );

  const GroupItem = ({ group, icon, children }) => (
    <div className="border-b last:border-b-0">
      <div
        className="flex items-center px-2 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer"
        onClick={() => toggleGroup(group.id)}
      >
        <IconButton size="small" className="mr-1">
          <FuseSvgIcon size={20}>
            {expandedGroups.includes(group.id)
              ? "heroicons-outline:chevron-down"
              : "heroicons-outline:chevron-right"}
          </FuseSvgIcon>
        </IconButton>
        {icon}
        <span className="ml-2 text-sm font-medium">{group.name}</span>
      </div>
      {expandedGroups.includes(group.id) && children}
    </div>
  );

  const GroupItems = ({ group, icon, children, layers }) => {
    const allLayersSelected =
      layers &&
      layers.length > 0 &&
      layers.every((layer) => selectedLayers.includes(layer.id));

    return (
      <div className="border-b last:border-b-0">
        <div className="flex items-center px-2 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer">
          <IconButton
            size="small"
            className="mr-1"
            onClick={() => toggleGroup(group.id)}
          >
            <FuseSvgIcon size={20}>
              {expandedGroups.includes(group.id)
                ? "heroicons-outline:chevron-down"
                : "heroicons-outline:chevron-right"}
            </FuseSvgIcon>
          </IconButton>
          {layers && (
            <Checkbox
              checked={allLayersSelected}
              onChange={() => toggleGroupLayers(group, layers)}
              size="small"
              className="mr-1"
            />
          )}
          {icon}
          <span className="ml-2 text-sm font-medium">{group.name}</span>
        </div>
        {expandedGroups.includes(group.id) && children}
      </div>
    );
  };
  const renderLayer = (layer, indent = 1) => (
    <div key={layer.id}>
      {layer.children ? (
        <GroupItems
          group={layer}
          layers={layer.children}
          indent={indent}
          hasActions={layer.hasActions}
        >
          {layer.children.map((childLayer) => (
            <LayerItem
              key={childLayer.id}
              layer={childLayer}
              indent={indent + 1}
            />
          ))}
        </GroupItems>
      ) : (
        <LayerItem layer={layer} indent={indent} />
      )}
    </div>
  );

  return (
    <div>
      <div className="top-heading-wrap mb-10">
        <div className="flex justify-between items-center bg-primary-50 p-4 border-b-2 border-b-black">
          <span className="font-semibold text-lg">Lớp dữ liệu</span>
          <IconButton size="small">
            <FuseSvgIcon size={20}>heroicons-outline:x-circle</FuseSvgIcon>
          </IconButton>
        </div>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <GroupItem
          group={{ id: "g_BaseLayers", name: "Lớp nền" }}
          icon={<FuseSvgIcon size={20}>heroicons-outline:template</FuseSvgIcon>}
        >
          {baseLayers.map((layer) => renderLayer(layer))}
        </GroupItem>

        <GroupItems
          group={{ id: "g_2", name: "Danh sách ảnh vệ tinh" }}
          icon={
            <FuseSvgIcon size={20}>heroicons-outline:globe-alt</FuseSvgIcon>
          }
          layers={danhSachAnhVeTinh}
        >
          {danhSachAnhVeTinh.map((layer) => renderLayer(layer))}
        </GroupItems>

        <GroupItems
          group={{ id: "g_1", name: "Dữ liệu rừng" }}
          icon={<FuseSvgIcon size={20}>heroicons-outline:map</FuseSvgIcon>}
          layers={forestLayers}
        >
          {forestLayers.map((layer) => renderLayer(layer))}
        </GroupItems>
      </div>
    </div>
  );
};

export default LopDuLieuQLDLTab;
