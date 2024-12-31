import LeftSidePhatHienBienDongRung from "app/theme-layouts/layout3/components/left-side-components/LeftSidePhatHienBienDongRung";
import PhatHienBienDongRung from "./PhatHienBienDongRung";
import { Navigate } from "react-router";



const PhatHienBienDongRungConfig = {
  settings: {
    layout: {
      config:{
        leftSidePanel: {
        display: true, // Hiển thị LeftSideLayout
        component: LeftSidePhatHienBienDongRung // Gắn LeftSidePhatHienBienDongRung làm thành phần layout
      }
      }
      
    }
  },
  routes: [
    {
      path: 'giam-sat-mat-rung/phat-hien-bien-dong',
      children: [
        {
          path: '',
          element: <Navigate to="lop-du-lieu" />
        },
        {
          path: 'lop-du-lieu',
          element: <PhatHienBienDongRung />
        },
        {
          path: 'tim-kiem',
          element: <PhatHienBienDongRung />
        },
        {
          path: 'phat-hien-bien-dong',
          element: <PhatHienBienDongRung />
        },
        {
          path: 'bien-dong-rung',
          element: <PhatHienBienDongRung />
        },
        {
          path: 'map',
          element: <PhatHienBienDongRung />
        },
        {
          path: 'chu-giai',
          element: <PhatHienBienDongRung />
        }
      ]
    }
  ]
};
export default PhatHienBienDongRungConfig;
