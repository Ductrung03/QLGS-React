import { Tabs, Tab, Box, Tooltip } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TimKiem from './components/TimKiem';
import { useNavigate, useLocation } from 'react-router-dom';
import PhatHienBienDongRungTabComponent from './components/PhatHienBienDongRungTabComponent';
import LopDuLieu from './components/LopDuLieu';
import LopDuLieuQLDLTab from './components/quan-ly-du-lieu/LopDuLieuQLDLTab';
import DanhSachHanhChinhQLDLTab from './components/quan-ly-du-lieu/DanhSachHanhChinhQLDLTab';

const QuanLyDuLieuTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const routeToIndex = {
    '/quan-ly-du-lieu/danh-sach-hanh-chinh': 0,  
    '/quan-ly-du-lieu/lop-du-lieu': 1,
    '/quan-ly-du-lieu/tim-kiem': 2,
    '/quan-ly-du-lieu/chu-giai': 3,
    '/quan-ly-du-lieu/thong-tin-doi-tuong': 4
  };

  const currentTab = routeToIndex[location.pathname] || 0;

  const handleChange = (event, newValue) => {
    const routes = [
      '/quan-ly-du-lieu/danh-sach-hanh-chinh',
      '/quan-ly-du-lieu/lop-du-lieu',
      '/quan-ly-du-lieu/tim-kiem',
      '/quan-ly-du-lieu/chu-giai',
      '/quan-ly-du-lieu/thong-tin-doi-tuong'
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
          <Tooltip title="Biểu đồ" placement="right">
            <FuseSvgIcon size={24}>material-twotone:insert_chart_outlined</FuseSvgIcon>
          </Tooltip>
        } />
        <Tab icon={
          <Tooltip title="Báo cáo bản đồ biến động rừng" placement="right">
            <FuseSvgIcon size={24}>heroicons-outline:map</FuseSvgIcon>
          </Tooltip>
        } />
        <Tab icon={
          <Tooltip title="Biểu đồ biến động rừng" placement="right">
            <FuseSvgIcon size={24}>heroicons-outline:chart-bar</FuseSvgIcon>
          </Tooltip>
        } />
      </Tabs>

      <Box sx={{ flex: 1, height: '100%', overflow: 'hidden' }}>
        {location.pathname === '/quan-ly-du-lieu/danh-sach-hanh-chinh' && <DanhSachHanhChinhQLDLTab/>}
        {location.pathname === '/quan-ly-du-lieu/lop-du-lieu' && <LopDuLieuQLDLTab/>}
        {location.pathname === '/quan-ly-du-lieu/tim-kiem' && <TimKiem/>}
        {location.pathname === '/quan-ly-du-lieu/chu-giai'}
        {location.pathname === '/quan-ly-du-lieu/thong-tin-doi-tuong'}
      </Box>
    </Box>
  );
};

export default QuanLyDuLieuTab;