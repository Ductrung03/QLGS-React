import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { useLocation } from 'react-router-dom';
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
  
  function QuanLyDuLieu() {
	const { t } = useTranslation('examplePage');
	const location = useLocation();
  
	const renderComponent = () => {
	  switch (location.pathname) {
		case '/quan-ly-du-lieu/danh-sach-hanh-chinh':
		  return <MapComponent />;
		case '/quan-ly-du-lieu/lop-du-lieu':
		  return <MapComponent />;  
		case '/quan-ly-du-lieu/tim-kiem':
		  return <MapComponent />;
        case '/quan-ly-du-lieu/chu-giai':
		  return <MapComponent />;
        case '/quan-ly-du-lieu/thong-tin-doi-tuong':
		  return <MapComponent />;
		default:
		  return <MapComponent />;
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
  
  export default QuanLyDuLieu;