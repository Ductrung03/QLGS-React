import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import Navigation from '../../shared-components/navigation/Navigation';

const Root = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
}));

const LogoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#1E2837',
    padding: '0 16px',
    flex: '0 0 auto', // Thay đổi thành 0 0 auto để container chỉ rộng bằng nội dung
    height: '100%'
});

const NavigationContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '24px', // Giảm khoảng cách với logo
    flex: '1 1 auto'
});

function NavbarLayout3(props) {
    const { className = '' } = props;
    return (
        <Root className={clsx('h-64 max-h-64 min-h-64 w-full shadow-md', className)}>
            <div className="flex h-full w-full items-center"> {/* Thêm items-center */}
                <LogoContainer>
                    <div className="w-4 h-4 bg-white"></div>
                    <h1 className="font-medium text-white text-lg uppercase tracking-wide whitespace-nowrap"> {/* Thêm whitespace-nowrap */}
                        Phần mềm quản lý, giám sát tài nguyên rừng tỉnh Tuyên Quang
                    </h1>
                </LogoContainer>

                <NavigationContainer>
                    <FuseScrollbars className="flex h-full items-center">
                        <Navigation
                            className="w-full"
                            layout="horizontal"
                            dense
                        />
                    </FuseScrollbars>
                </NavigationContainer>
            </div>
        </Root>
    );
}

export default memo(NavbarLayout3);