import { useSelect } from '@wordpress/data';

import { blockEditorStore } from './block-editor-store';
import { getEffectivePaletteColor } from './colors';
import type { HexColor } from './types';

interface ColoredBlock {
	clientId: string;
	color: HexColor;
	selectedColor: string;
}

const COLOR_BLOCK_ICON_ONLY = true;

const getBlockColorRules = ({ clientId, color, selectedColor }: ColoredBlock): string => {
	const selector = `.block-editor-list-view-leaf[data-block="${window.CSS.escape(clientId)}"]`;

	if (COLOR_BLOCK_ICON_ONLY) {
		return `${selector} .block-editor-block-icon{background-color:${color};border-radius:4px;}${selector}.is-selected .block-editor-block-icon{background-color:${selectedColor};}`;
	}

	return `${selector}:not(.is-selected)>td{background-color:${color};}${selector}.is-selected>td{background-color:${selectedColor};}${selector}>td:first-child{box-shadow:inset 4px 0 ${color};}${selector}.is-selected .block-editor-list-view-block-contents:focus::after{box-shadow:inset 0 0 0 1px #fff,0 0 0 var(--wp-admin-border-width-focus) ${selectedColor};}`;
};

const ListViewColors = () => {
	const coloredBlocks = useSelect((select) => {
		const selectors = select(blockEditorStore);

		return selectors
			.getClientIdsWithDescendants()
			.reduce<ColoredBlock[]>((blocks, clientId) => {
				const paletteColor = getEffectivePaletteColor(selectors, clientId);

				if (paletteColor) {
					blocks.push({
						clientId,
						color: paletteColor.displayColor,
						selectedColor: paletteColor.selectedColor,
					});
				}

				return blocks;
			}, []);
	}, []);

	if (!coloredBlocks.length) {
		return null;
	}

	const rules = coloredBlocks.map(getBlockColorRules).join('');

	return <style>{rules}</style>;
};

export default ListViewColors;
