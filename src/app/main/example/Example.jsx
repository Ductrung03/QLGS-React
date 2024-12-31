import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MapComponent from 'app/shared-components/tabs/components/MapComponent';
import LopDuLieu from 'app/shared-components/tabs/components/LopDuLieu';


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
  
  function Example() {
	const { t } = useTranslation('examplePage');
	const location = useLocation();
  
	const renderComponent = () => {
	  switch (location.pathname) {
		case '/example/lop-du-lieu':
		  return <MapComponent />;
		case '/example/tim-kiem':
		  return <MapComponent />;
		case '/example/phat-hien-bien-dong':
		  return <MapComponent />;
		case '/example/bien-dong-rung':
		  return <MapComponent />;
		case '/example/map':
		  return <MapComponent />;
		case '/example/chu-giai':
		  return <div>Content of Item Three</div>;
		default:
		  return <LopDuLieu />;
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
  
  export default Example;