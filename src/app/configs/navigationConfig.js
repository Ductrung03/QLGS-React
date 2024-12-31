import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
	{
		id: 'gsmr',
		title: 'Giám sát mất rừng',
		subtitle: 'Custom made application designs',
		type: 'group',
		vertical: true,
		children: [{
				id: 'gsmr.phbdr',
				title: 'Phát hiện biến động rừng',
				type: 'item',
				url: 'giam-sat-mat-rung/phat-hien-bien-dong',
			},
			{
				id: 'gsmr.avt',
				title: 'Ảnh vệ tinh',
				type: 'item',
				url: '/apps/academy',
			}
		]
	},
	{
		id: 'xldltt',
		title: 'Xử lý dữ liệu trực tuyến',
		type: 'group',
		vertical: true,
		children: [{
				id: 'lm',
				title: 'Lọc mây',
				type: 'item',
				url: 'locmay',
			},
			{
				id: 'xlavt',
				title: 'Xử lý ảnh viễn thám',
				type: 'item',
				url: 'xulyanh',
			},
			{
				id: 'ptmr',
				title: 'Phân tích mất rừng',
				type: 'item',
				url: 'phantichmatrung',
			},
			{
				id: 'test',
				title: 'Test',
				type: 'item',
				url: 'test',
			}
		]
	},
	{
		id: 'qldl',
		title: 'Quản lý dữ liệu',
		type: 'group',
		url: 'quan-ly-du-lieu',
	},
	{
		id: 'bc',
		title: 'Báo cáo',
		type: 'group',
		url: 'bao-cao',
	},
	{
		id: 'ht',
		title: 'Hệ thống',
		subtitle: 'Custom made application designs',
		type: 'group',
		children: [{
				id: 'ht.qtht',
				title: 'Quản trị hệ thống',
				type: 'item',
				url: '/apps/academy',
			},
			{
				id: 'ht.qlbdcd',
				title: 'Quản lý bản đồ chuyên đề',
				type: 'item',
				url: '/apps/academy',
			},
			{
				id: 'ht.qlldl',
				title: 'Quản lý lớp dữ liệu',
				type: 'item',
				url: '/apps/academy',
			},
			{
				id: 'ht.qldm',
				title: 'Quản lý danh mục',
				type: 'item',
				url: '/apps/academy',
			},
			{
				id: 'ht.chht',
				title: 'Cấu hình hệ thống',
				type: 'item',
				url: '/apps/academy',
			},
			{
				id: 'ht.qlbdl',
				title: 'Quản lý bảng dữ liệu',
				type: 'item',
				url: '/apps/academy',
			}
		]
	},
];
export default navigationConfig;