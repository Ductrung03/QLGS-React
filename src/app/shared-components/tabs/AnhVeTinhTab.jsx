import { Tabs, Tab, Box, Tooltip } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TimKiem from './components/TimKiem';
import { useNavigate, useLocation } from 'react-router-dom';
import PhatHienBienDongRungTabComponent from './components/PhatHienBienDongRungTabComponent';

const AnhVeTinhTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const routeToIndex = {
    '/anh-ve-tinh/danh-sach-hanh-chinh': 0,  
    '/anh-ve-tinh/lop-du-lieu': 1,
    '/anh-ve-tinh/chu-giai': 2,
    '/anh-ve-tinh/xem-anh-ve-tinh': 3
  };

  const currentTab = routeToIndex[location.pathname] || 0;

  const handleChange = (event, newValue) => {
    const routes = [
      '/anh-ve-tinh/danh-sach-hanh-chinh',
      '/anh-ve-tinh/lop-du-lieu',
      '/anh-ve-tinh/chu-giai',
      '/anh-ve-tinh/xem-anh-ve-tinh'
    ];
    navigate(routes[newValue]);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Tabs
        orientation="vertical" 
        value={currentTab}
        onChange={handleChange}
        sx={{
          minWidth: 48,
          width: 48,
          borderRight: 0,
          '& .MuiTab-root': {
            minWidth: 48,
            width: 48,
            minHeight: 48,
            padding: 0,
            marginBottom: 1
          }
        }}
      >
        <Tab icon={
          <Tooltip title="Danh sách hành chính" placement="right">
            <FuseSvgIcon size={24}>material-twotone:insert_chart_outlined</FuseSvgIcon>
          </Tooltip>
        } />
        <Tab icon={
          <Tooltip title="Lớp dữ liệu" placement="right">
            <FuseSvgIcon size={24}>heroicons-outline:map</FuseSvgIcon>
          </Tooltip>
        } />
        <Tab icon={
          <Tooltip title="Chú giải" placement="right">
            <FuseSvgIcon size={24}>heroicons-outline:chart-bar</FuseSvgIcon>
          </Tooltip>
        } />
        <Tab icon={
          <Tooltip title="Xem ảnh vệ tinh" placement="right">
            <FuseSvgIcon size={24}>heroicons-outline:chart-bar</FuseSvgIcon>
          </Tooltip>
        } />
      </Tabs>

      <Box sx={{ flex: 1, height: '100%', overflow: 'hidden' }}>
        {location.pathname === '/anh-ve-tinh/danh-sach-hanh-chinh' }
        {location.pathname === '/anh-ve-tinh/lop-du-lieu' && <TimKiem/>}
        {location.pathname === '/anh-ve-tinh/chu-giai'}
        {location.pathname === '/anh-ve-tinh/xem-anh-ve-tinh'}
      </Box>
    </Box>
  );
};

export default AnhVeTinhTab;