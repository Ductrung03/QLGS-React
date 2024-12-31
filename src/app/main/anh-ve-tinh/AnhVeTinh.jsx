import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import MapComponent from 'E:/DucTrung/LK/Job/Web/React/QLGS/Fuse-React-10.5.0-js-skeleton/src/app/shared-components/tabs/components/MapComponent';
import LopDuLieu from 'E:/DucTrung/LK/Job/Web/React/QLGS/Fuse-React-10.5.0-js-skeleton/src/app/shared-components/tabs/components/LopDuLieu';
import { useLocation } from 'react-router-dom';

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
  
  function AnhVeTinh() {
	const { t } = useTranslation('examplePage');
	const location = useLocation();
  
	const renderComponent = () => {
	  switch (location.pathname) {
		case '/anh-ve-tinh/bieu-do':
		  return <BieuDoBaoCaoComponent />;
		case '/anh-ve-tinh/anh-ve-tinh-ban-do-bien-dong-rung':
		  return <MapComponent />;  
		case '/anh-ve-tinh/bieu-do-bien-dong-rung':
		  return <BieuDoBienDongRungBaoCaoComponent />;
        case '/anh-ve-tinh/bieu-do-bien-dong-rung':
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
  
  export default AnhVeTinh;