
import Test from './Test';


const TestConfig = {
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
          path: 'test',
          element: (
            
              <Test />
          )
        }
      ]
    };
export default TestConfig;