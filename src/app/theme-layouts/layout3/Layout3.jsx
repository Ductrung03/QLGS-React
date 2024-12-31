import FuseDialog from '@fuse/core/FuseDialog';
import { styled } from '@mui/material/styles';
import FuseMessage from '@fuse/core/FuseMessage';
import FuseSuspense from '@fuse/core/FuseSuspense';
import clsx from 'clsx';
import { memo, Suspense, useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import AppContext from 'app/AppContext';
import { selectFuseCurrentLayoutConfig } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { useAppSelector } from 'app/store/hooks';
import FooterLayout3 from './components/FooterLayout3';
import LeftSideLayout3 from './components/LeftSideLayout3';
import NavbarWrapperLayout3 from './components/NavbarWrapperLayout3';
import RightSideLayout3 from './components/RightSideLayout3';

const Root = styled('div')(({ config }) => ({
  ...(config.mode === 'boxed' && {
    clipPath: 'inset(0)',
    maxWidth: `${config.containerWidth}px`,
    margin: '0 auto',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }),
  ...(config.mode === 'container' && {
    '& .container': {
      maxWidth: `${config.containerWidth}px`,
      width: '100%',
      margin: '0 auto'
    }
  })
}));

function Layout3(props) {
  const { children } = props;
  const config = useAppSelector(selectFuseCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;


  return (
    <Root
      id="fuse-layout"
      className="flex w-full flex-col"  // Thêm flex-col để stack các phần tử
      config={config}
    >
      {/* Navbar ở hàng đầu tiên */}
      {config.navbar.display && (
        <NavbarWrapperLayout3
          className={clsx(
            'w-full',
            config?.navbar?.style === 'fixed' ? 'sticky top-0 z-50' : ''
          )}
        />
      )}

      {/* Container cho content và panels */}
      <div className="flex flex-1 min-h-0">
        {/* Left Panel */}
{console.log('LeftSidePanel Config:', config.leftSidePanel)}
{config.leftSidePanel?.display ? (
  config.leftSidePanel.component ? (
    <config.leftSidePanel.component />
  ) : (
    <div>Left side panel component is not defined</div>
  )
) : null}


        

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <main id="fuse-main" className="relative flex  flex-col">
            <div className="relative z-10 flex min-h-0 flex-auto flex-col">
              <FuseSuspense>{useRoutes(routes)}</FuseSuspense>

              <Suspense>
                <FuseDialog />
              </Suspense>
              {children}
            </div>

            
          </main>
        </div>

        
      </div>

      <FuseMessage />
    </Root>
  );
}


export default memo(Layout3);