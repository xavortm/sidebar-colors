import { BlockSettingsMenuControls } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useLayoutEffect, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import type { CSSProperties } from 'react';

import { blockEditorStore } from './block-editor-store';
import { COLOR_ATTRIBUTE, COLOR_PALETTE, getEffectivePaletteColor } from './colors';

interface ColorSwatchesProps {
	onClose: () => void;
	selectedClientIds: readonly string[];
}

interface SwatchStyle extends CSSProperties {
	'--sidebar-colors-swatch-color': string;
}

const getSwatchStyle = (color: string): SwatchStyle => ({
	'--sidebar-colors-swatch-color': color,
});

const ColorSwatches = ({ onClose, selectedClientIds }: ColorSwatchesProps) => {
	const { updateBlockAttributes } = useDispatch(blockEditorStore);
	const selectedColor = useSelect(
		(select) => {
			const selectors = select(blockEditorStore);
			const colors = selectedClientIds.map(
				(clientId) => getEffectivePaletteColor(selectors, clientId)?.color,
			);

			return colors.every((color) => color === colors[0]) ? colors[0] : '';
		},
		[selectedClientIds],
	);

	const setColor = (color: string): void => {
		updateBlockAttributes(selectedClientIds, {
			[COLOR_ATTRIBUTE]: color,
		});
		onClose();
	};

	return (
		<div
			className="sidebar-colors-swatches"
			role="group"
			aria-label={__('Block color', 'sidebar-colors')}
		>
			{COLOR_PALETTE.map(({ color, displayColor, label }) => (
				<Button
					key={color}
					className="sidebar-colors-swatch"
					aria-label={sprintf(
						/* translators: %s: Color name. */
						__('Set block color to %s', 'sidebar-colors'),
						label,
					)}
					isPressed={selectedColor === color}
					onClick={() => setColor(color)}
					style={getSwatchStyle(displayColor)}
				/>
			))}
			<Button
				className="sidebar-colors-swatch sidebar-colors-swatch--clear"
				aria-label={__('Remove block color', 'sidebar-colors')}
				isPressed={!selectedColor}
				onClick={() => setColor('')}
			/>
		</div>
	);
};

const BlockColorMenu = () => {
	const separatorRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const separator = separatorRef.current;
		const swatches = separator?.nextElementSibling;
		const group = separator?.parentElement;
		const lastControl = group?.lastElementChild;

		// Core appends "Edit as HTML" after public fills. Keep DOM and focus order aligned.
		if (swatches && lastControl && lastControl !== swatches && lastControl !== separator) {
			lastControl.after(separator, swatches);
		}
	});

	return (
		<BlockSettingsMenuControls>
			{({ onClose, selectedClientIds }) => (
				<>
					<div
						ref={separatorRef}
						className="sidebar-colors-menu-separator"
						role="separator"
					/>
					<ColorSwatches onClose={onClose} selectedClientIds={selectedClientIds} />
				</>
			)}
		</BlockSettingsMenuControls>
	);
};

export default BlockColorMenu;
