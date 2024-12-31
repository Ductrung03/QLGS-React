import XuLyAnh from "./XuLyAnh";


const XuLyAnhConfig = {
    settings: {
        layout: {
          config:{
            leftSidePanel:{
              display: false
            }
          }
        }
      },
      routes: [
        {
          path: 'xulyanh',
          element: (
            
              <XuLyAnh />
          )
        }
      ]
    };
export default XuLyAnhConfig;