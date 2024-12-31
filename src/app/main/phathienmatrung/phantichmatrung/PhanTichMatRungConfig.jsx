import PhanTichMatRung from "./PhanTichMatRung";

const PhanTichMatRungConfig = {
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
          path: 'phantichmatrung',
          element: (
            
              <PhanTichMatRung />
           
          )
        }
      ]
    };
export default PhanTichMatRungConfig;