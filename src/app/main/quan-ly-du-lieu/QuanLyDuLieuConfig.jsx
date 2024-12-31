

import { Navigate } from "react-router";
import LeftSideQuanLyDuLieu from "app/theme-layouts/layout3/components/left-side-components/LeftSideQuanLyDuLieu";

import QuanLyDuLieu from "./QuanLyDuLieu";



const QuanLyDuLieuConfig = {
  settings: {
    layout: {
      config:{
        leftSidePanel: {
        display: true, // Hiển thị LeftSideLayout
        component: LeftSideQuanLyDuLieu // Gắn LeftSidePhatHienBienDongRung làm thành phần layout
      }
      }
      
    }
  },
  routes: [
    {
      path: 'quan-ly-du-lieu',
      children: [
        {
          path: '',
          element: <Navigate to="lop-du-lieu" />
        },
        {
          path: 'lop-du-lieu',
          element: <QuanLyDuLieu />
        },
        {
          path: 'danh-sach-hanh-chinh',
          element: <QuanLyDuLieu />
        },
        {
          path: 'tim-kiem',
          element: <QuanLyDuLieu />
        },
        {
          path: 'thong-tin-doi-tuong',
          element: <QuanLyDuLieu />
        },
        {
          path: 'chu-giai',
          element: <QuanLyDuLieu />
        }
      ]
    }
  ]
};
export default QuanLyDuLieuConfig;
