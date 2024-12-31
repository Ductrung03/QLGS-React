import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { memo, useState } from 'react';
import FuseSvgIcon from '../FuseSvgIcon';

const Root = styled('div')(({ theme }) => ({
  '& .FuseSidePanel-paper': {
    width: 400,
    minWidth: 300,
    height: '100%',
    transition: theme.transitions.create(['transform', 'width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    '&.closed': {
      width: 48,
      minWidth: 48,
      '& .FuseSidePanel-buttonWrapper': {
        display: 'none'
      },
      '& .FuseSidePanel-content': {
        opacity: 1,
        width: 48
      }
    }
  },
  '& .FuseSidePanel-content': {
    overflow: 'hidden',
    width: '100%',
    opacity: 1,
    transition: theme.transitions.create(['opacity', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short
    })
  },
  '& .FuseSidePanel-buttonWrapper': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    width: '100%',
    minWidth: 56
  },
  '& .FuseSidePanel-button': {
    padding: 8,
    width: 40,
    height: 40
  },
  '& .FuseSidePanel-buttonIcon': {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short
    })
  },
  '& .FuseSidePanel-mobileButton': {
    height: 40,
    position: 'absolute',
    zIndex: 99,
    bottom: 12,
    width: 24,
    borderRadius: 38,
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['background-color', 'border-radius', 'width', 'min-width', 'padding'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&:hover': {
      width: 52,
      paddingLeft: 8,
      paddingRight: 8
    },
    '&.left': {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      paddingLeft: 4,
      left: 0
    },
    '&.right': {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      paddingRight: 4,
      right: 0,
      '& .FuseSidePanel-buttonIcon': {
        transform: 'rotate(-180deg)'
      }
    }
  }
}));

function FuseSidePanel(props) {
  const { position = 'left', opened = true, className, children } = props;
  const [panelOpened, setPanelOpened] = useState(Boolean(opened));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleOpened = () => setPanelOpened(!panelOpened);
  const toggleMobileDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <Root className="h-full">
      <Hidden lgDown>
        <Paper
          className={clsx(
            'FuseSidePanel-paper',
            className,
            !opened || !panelOpened ? 'closed' : 'opened',
            position,
            'shadow-lg'
          )}
          square
        >
          <FuseScrollbars className={clsx('content', 'FuseSidePanel-content')}>{children}</FuseScrollbars>
          <div className="FuseSidePanel-buttonWrapper">
            <Tooltip title="Toggle side panel" placement="right">
              <IconButton className="FuseSidePanel-button" onClick={toggleOpened} disableRipple size="large">
                <FuseSvgIcon className="FuseSidePanel-buttonIcon">
                  heroicons-outline:chevron-left
                </FuseSvgIcon>
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          classes={{paper: clsx('FuseSidePanel-paper', className)}}
          anchor={position}
          open={mobileOpen}
          onOpen={() => {}}
          onClose={toggleMobileDrawer}
          disableSwipeToOpen
        >
          <FuseScrollbars className={clsx('content', 'FuseSidePanel-content')}>{children}</FuseScrollbars>
        </SwipeableDrawer>
      </Hidden>
    </Root>
  );
}

export default memo(FuseSidePanel);