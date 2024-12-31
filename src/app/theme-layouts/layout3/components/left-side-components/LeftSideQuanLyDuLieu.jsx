import FuseSidePanel from '@fuse/core/FuseSidePanel';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import BaoCaoTab from 'app/shared-components/tabs/BaoCaoTab';
import QuanLyDuLieuTab from 'app/shared-components/tabs/QuanLyDuLieuTab';
function LeftSideQuanLyDuLieu() {
  const location = useLocation();
  const isCollapsedRoute = location.pathname === '/bao-cao/bieu-do' || 
                          location.pathname === '/bao-cao/bieu-do-bien-dong-rung';

  return (
    <FuseSidePanel opened={!isCollapsedRoute}>
      <QuanLyDuLieuTab />
    </FuseSidePanel>
  );
}

export default memo(LeftSideQuanLyDuLieu);
