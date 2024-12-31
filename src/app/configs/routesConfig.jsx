import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import LocMayConfig from '../main/phathienmatrung/locmay/LocMayConfig';
import XuLyAnhConfig from '../main/phathienmatrung/xulyanh/XuLyAnhConfig';
import PhanTichMatRungConfig from './../main/phathienmatrung/phantichmatrung/PhanTichMatRungConfig';
import PhatHienBienDongRungConfig from '../main/giam-sat-mat-rung/phat-hien-bien-dong-rung/PhatHienBienDongRungConfig';
import BaoCaoConfig from '../main/bao-cao/BaoCaoConfig';
import QuanLyDuLieuConfig from '../main/quan-ly-du-lieu/QuanLyDuLieuConfig';
import TestConfig from '../main/phathienmatrung/test/TestConfig';


const routeConfigs = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig, 
	PhatHienBienDongRungConfig, LocMayConfig, XuLyAnhConfig, PhanTichMatRungConfig, BaoCaoConfig, QuanLyDuLieuConfig,TestConfig];
/**
 * The routes of the application.
 */
const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/example" />,
		auth: settingsConfig.defaultAuth
	},
	
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];
export default routes;
