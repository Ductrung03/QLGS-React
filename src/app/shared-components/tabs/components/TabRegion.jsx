import React, { useState } from 'react';
import { Box, Tabs, Tab, IconButton, Checkbox } from "@mui/material";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const TabRegion = () => {
  const [expandedGroups, setExpandedGroups] = useState(['08', '070']);
  const [selectedLayers, setSelectedLayers] = useState([]);

  // Updated data structure to reflect proper hierarchy
  const regionLayers = [
    {
      id: '08',
      name: 'Tỉnh Tuyên Quang',
      hasActions: true,
      children: [
        {
          id: '070',
          name: 'Thành phố Tuyên Quang',
          hasActions: true,
          children: [
            { id: '02200', name: 'Phường Phan Thiết' },
            { id: '02203', name: 'Phường Minh Xuân' },
            { id: '02209', name: 'Xã Tràng Đà' },
            { id: '02216', name: 'Phường Tân Hà' },
            { id: '02215', name: 'Phường Ỷ La' },
            { id: '02206', name: 'Phường Tân Quang' },
            { id: '02212', name: 'Phường Nông Tiến' },
            { id: '02218', name: 'Phường Hưng Thành' },
            { id: '02512', name: 'Phường An Tường' },
            { id: '02503', name: 'Xã An Khang' },
            { id: '02515', name: 'Xã Lưỡng Vượng' },
            { id: '02521', name: 'Xã Thái Long' },
            { id: '02524', name: 'Phường Đội Cấn' },
            { id: '02497', name: 'Xã Kim Phú' },
            { id: '02509', name: 'Phường Mỹ Lâm' }
          ]
        },
        {
          id: '071',
          name: 'Huyện Lâm Bình',
          hasActions: true,
          children: [
            { id: '02233', name: 'Xã Phúc Yên' },
            { id: '02242', name: 'Xã Xuân Lập' },
            { id: '02251', name: 'Xã Khuôn Hà' },
            { id: '02266', name: 'Thị trấn Lăng Can' },
            { id: '02269', name: 'Xã Thượng Lâm' },
            { id: '02290', name: 'Xã Bình An' },
            { id: '02293', name: 'Xã Hồng Quang' },
            { id: '02296', name: 'Xã Thổ Bình' },
            { id: '02302', name: 'Xã Minh Quang' },
            { id: '02299', name: 'Xã Phúc Sơn' }
          ]
        },
        {
          id: '072',
          name: 'Huyện Na Hang',
          hasActions: true
        },
        {
          id: '074',
          name: 'Huyện Hàm Yên',
          hasActions: true
        },
        {
          id: '075',
          name: 'Huyện Yên Sơn',
          hasActions: true
        },
        {
          id: '076',
          name: 'Huyện Sơn Dương',
          hasActions: true
        },
        {
          id: '073',
          name: 'Huyện Chiêm Hóa',
          hasActions: true
        },
        {
          id: '077',
          name: 'Cham Chu',
          hasActions: true
        }
      ]
    }
  ];

  const toggleGroup = (groupId, event) => {
    event?.stopPropagation();
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleLayer = (layerId) => {
    setSelectedLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

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
    setSelectedLayers(prev => {
      const groupSelected = layerIds.every(id => prev.includes(id));
      if (groupSelected) {
        return prev.filter(id => !layerIds.includes(id));
      } else {
        return [...new Set([...prev, ...layerIds])];
      }
    });
  };

  const LayerItem = ({ layer, indent = 0 }) => (
    <div 
      className={`flex items-center px-2 py-1.5 hover:bg-gray-50 ${
        selectedLayers.includes(layer.id) ? 'bg-blue-50 hover:bg-blue-100' : ''
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

  const renderLayer = (layer, indent = 1) => (
    <div key={layer.id}>
      {layer.children ? (
        <GroupItems
          group={layer}
          layers={layer.children}
          indent={indent}
          hasActions={layer.hasActions}
        >
          {layer.children.map(childLayer => renderLayer(childLayer, indent + 1))}
        </GroupItems>
      ) : (
        <LayerItem layer={layer} indent={indent} />
      )}
    </div>
  );

  const GroupItems = ({ group, icon, children, layers, indent = 0 }) => {
    const allLayerIds = layers?.reduce((ids, layer) => {
      ids.push(layer.id);
      if (layer.children) {
        layer.children.forEach(child => ids.push(child.id));
      }
      return ids;
    }, []) || [];

    const allLayersSelected = allLayerIds.length > 0 && 
      allLayerIds.every(id => selectedLayers.includes(id));

    return (
      <div className="border-b last:border-b-0">
        <div
          className={`flex items-center px-2 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer`}
          style={{ paddingLeft: `${indent * 20}px` }}
        >
          {group.children && (
            <IconButton 
              size="small" 
              className="mr-1" 
              onClick={(e) => toggleGroup(group.id, e)}
            >
              <FuseSvgIcon size={20}>
                {expandedGroups.includes(group.id)
                  ? 'heroicons-outline:chevron-down'
                  : 'heroicons-outline:chevron-right'}
              </FuseSvgIcon>
            </IconButton>
          )}
          <Checkbox
            checked={allLayersSelected}
            onChange={() => toggleGroupLayers(group, layers)}
            size="small"
            className="mr-1"
          />
          {icon}
          <span className="ml-2 text-sm font-medium">{group.name}</span>
          {group.hasActions && (
            <IconButton size="small" className="text-gray-500 ml-auto">
              <FuseSvgIcon size={20}>heroicons-outline:dots-vertical</FuseSvgIcon>
            </IconButton>
          )}
        </div>
        {expandedGroups.includes(group.id) && children}
      </div>
    );
  };

  return (
    <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
      {regionLayers.map(layer => renderLayer(layer, 0))}
    </div>
  );
};

export default TabRegion;