import type { ComponentType, ReactNode } from 'react';

declare module '@wordpress/block-editor' {
	interface BlockSettingsMenuControlProps {
		onClose: () => void;
		selectedClientIds: string[];
	}

	interface BlockSettingsMenuControlsProps {
		children: (props: BlockSettingsMenuControlProps) => ReactNode;
	}

	export const BlockSettingsMenuControls: ComponentType<BlockSettingsMenuControlsProps>;
}
