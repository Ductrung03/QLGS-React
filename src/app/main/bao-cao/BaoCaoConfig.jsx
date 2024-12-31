
import { Navigate } from 'react-router-dom';

import LeftSideBaoCao from 'app/theme-layouts/layout3/components/left-side-components/LeftSideBaoCao';
import BaoCao from './BaoCao';





const BaoCaoConfig = {
  settings: {
    layout: {
		config: {
			leftSidePanel: {
        display: true, // Hiển thị LeftSideLayout
        component: LeftSideBaoCao // Gắn LeftSidePhatHienBienDongRung làm thành phần layout
      }}
		
	}
  },
  routes: [
    {
      path: 'bao-cao',
      children: [
        {
          path: '',
          element: <Navigate to="bieu-do" />
        },
        {
            path: 'bieu-do',
            element: <BaoCao />
          },
        {
          path: 'bao-cao-ban-do-bien-dong-rung',
          element: <BaoCao />
        },
        {
          path: 'bieu-do-bien-dong-rung',
          element: <BaoCao />
        },
      ]
    }
  ]
};

export default BaoCaoConfig;