import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BieuDoBaoCaoComponent from './components/BieuDoBaoCaoComponent';
import BieuDoBienDongRungBaoCaoComponent from './components/BieuDoBienDongRungBaoCaoComponent';
import MapComponent from 'app/shared-components/tabs/components/MapComponent';


const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
	  backgroundColor: theme.palette.background.paper,
	  borderBottomWidth: 1,
	  borderStyle: 'solid',
	  borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {
	  height: '100%',
	  display: 'flex'
	}
  }));
  
  function BaoCao() {
	const { t } = useTranslation('examplePage');
	const location = useLocation();
  
	const renderComponent = () => {
	  switch (location.pathname) {
		case '/bao-cao/bieu-do':
		  return <BieuDoBaoCaoComponent />;
		case '/bao-cao/bao-cao-ban-do-bien-dong-rung':
		  return <MapComponent />;  
		case '/bao-cao/bieu-do-bien-dong-rung':
		  return <BieuDoBienDongRungBaoCaoComponent />;
		default:
		  return <BieuDoBaoCaoComponent />;
	  }
	};
  
	return (
	  <Root
		
		content={
		  <Box className="w-full h-full flex">
			{/* Container có thể xử lý layout tốt hơn */}
			<Box className="relative flex flex-col flex-1">
			  {renderComponent()}
			</Box>
		  </Box>
		}
	  />
	);
  }
  
  export default BaoCao;