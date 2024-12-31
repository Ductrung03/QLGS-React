import React, { useState } from 'react';
import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import VerticalTabs from 'app/shared-components/tabs/VerticalTabs';
import { Box } from '@mui/material';
import MapComponent from 'E:/DucTrung/LK/Job/Web/React/QLGS/Fuse-React-10.5.0-js-skeleton/src/app/shared-components/tabs/components/MapComponent';
import LopDuLieu from 'E:/DucTrung/LK/Job/Web/React/QLGS/Fuse-React-10.5.0-js-skeleton/src/app/shared-components/tabs/components/LopDuLieu';
import TimKiem from 'E:/DucTrung/LK/Job/Web/React/QLGS/Fuse-React-10.5.0-js-skeleton/src/app/shared-components/tabs/components/TimKiem';
import PhatHienBienDongRung from '../../../app/shared-components/tabs/components/PhatHienBienDongRungTabComponent';
import BienDongRung from 'E:/DucTrung/LK/Job/Web/React/QLGS/Fuse-React-10.5.0-js-skeleton/src/app/shared-components/tabs/components/BienDongRung';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: '1 1 auto' // Thêm dòng này

  }
}));

function Example() {
  const { t } = useTranslation('examplePage');

  return (
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
        </div>
      }
      content={
        <div className="w-full h-full">
          <MapComponent />
        </div>
      }
    />
  );
}

export default Example;