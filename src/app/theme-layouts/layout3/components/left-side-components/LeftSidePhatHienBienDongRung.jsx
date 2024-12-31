import FuseSidePanel from '@fuse/core/FuseSidePanel';
import { memo } from 'react';
import PhatHienBienDongRungTab from 'app/shared-components/tabs/PhatHienBienDongRungTab';



/**
 * The left side layout 3.
 */
function LeftSidePhatHienBienDongRung() {
	return (
		<FuseSidePanel>
			<PhatHienBienDongRungTab/>
		</FuseSidePanel>
	);
}

export default memo(LeftSidePhatHienBienDongRung);
