import FuseSidePanel from '@fuse/core/FuseSidePanel';
import { memo } from 'react';
import NavigationShortcuts from '../../shared-components/navigation/NavigationShortcuts';
import VerticalTabs from 'app/shared-components/tabs/VerticalTabs';


/**
 * The left side layout 3.
 */
function LeftSideLayout3() {
	return (
		<FuseSidePanel>
			<VerticalTabs/>
		</FuseSidePanel>
	);
}

export default memo(LeftSideLayout3);
