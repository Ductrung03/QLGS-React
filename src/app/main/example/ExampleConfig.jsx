import i18next from 'i18next';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import LeftSideLayout3 from 'app/theme-layouts/layout3/components/LeftSideLayout3';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
		config: {
			leftSidePanel: {
        display: true, // Hiển thị LeftSideLayout
        component: LeftSideLayout3 // Gắn LeftSidePhatHienBienDongRung làm thành phần layout
      }}
		
	}
  },
  routes: [
    {
      path: 'example',
      children: [
        {
          path: '',
          element: <Navigate to="lop-du-lieu" />
        },
        {
          path: 'lop-du-lieu',
          element: <Example />
        },
        {
          path: 'tim-kiem',
          element: <Example />
        },
        {
          path: 'phat-hien-bien-dong',
          element: <Example />
        },
        {
          path: 'bien-dong-rung',
          element: <Example />
        },
        {
          path: 'map',
          element: <Example />
        },
        {
          path: 'chu-giai',
          element: <Example />
        }
      ]
    }
  ]
};

export default ExampleConfig;