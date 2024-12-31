import { Tabs, Tab, Box, Tooltip } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TimKiem from './components/TimKiem';
import { useNavigate, useLocation } from 'react-router-dom';
import PhatHienBienDongRungTabComponent from './components/PhatHienBienDongRungTabComponent';

const BaoCaoTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const routeToIndex = {
    '/bao-cao/bieu-do': 0,  
    '/bao-cao/bao-cao-ban-do-bien-dong-rung': 1,
    '/bao-cao/bieu-do-bien-dong-rung': 2,
  };

  const currentTab = routeToIndex[location.pathname] || 0;

  const handleChange = (event, newValue) => {
    const routes = [
      '/bao-cao/bieu-do',
      '/bao-cao/bao-cao-ban-do-bien-dong-rung',
      '/bao-cao/bieu-do-bien-dong-rung',
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
        {location.pathname === '/bao-cao/bieu-do' }
        {location.pathname === '/bao-cao/bao-cao-ban-do-bien-dong-rung' && <TimKiem/>}
        {location.pathname === '/bao-cao/bieu-do-bien-dong-rung'}
      </Box>
    </Box>
  );
};

export default BaoCaoTab;