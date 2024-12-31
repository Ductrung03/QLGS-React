import React from 'react';
import LocMay from './LocMay';

const LocMayConfig = {
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
          path: 'locmay',
          element: (
            
              <LocMay />
           
          )
        }
      ]
    };
export default LocMayConfig;