import FuseSidePanel from '@fuse/core/FuseSidePanel';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import BaoCaoTab from 'app/shared-components/tabs/BaoCaoTab';
function LeftSideBaoCao() {
  const location = useLocation();
  const isCollapsedRoute = location.pathname === '/bao-cao/bieu-do' || 
                          location.pathname === '/bao-cao/bieu-do-bien-dong-rung';

  return (
    <FuseSidePanel opened={!isCollapsedRoute}>
      <BaoCaoTab />
    </FuseSidePanel>
  );
}

export default memo(LeftSideBaoCao);
