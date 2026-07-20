import { __ } from '@wordpress/i18n';

import type { BlockEditorSelectors, HexColor } from './types';

export const COLOR_ATTRIBUTE = 'sidebarColorsColor' as const;

export interface PaletteColor {
	color: HexColor;
	displayColor: HexColor;
	selectedColor: string;
	label: string;
}

const DEFAULT_COLOR_PALETTE: readonly PaletteColor[] = [
	{
		color: '#f3a6a6',
		displayColor: '#f5b8b8',
		selectedColor: '#9d3333',
		label: __('Red', 'sidebar-colors'),
	},
	{
		color: '#f4bf86',
		displayColor: '#f6cc9e',
		selectedColor: '#8a4b08',
		label: __('Orange', 'sidebar-colors'),
	},
	{
		color: '#f1dc83',
		displayColor: '#f4e39c',
		selectedColor: '#6b5700',
		label: __('Yellow', 'sidebar-colors'),
	},
	{
		color: '#abd69f',
		displayColor: '#bcdeb2',
		selectedColor: '#356b30',
		label: __('Green', 'sidebar-colors'),
	},
	{
		color: '#8fd3ca',
		displayColor: '#a5dcd5',
		selectedColor: '#1f7068',
		label: __('Teal', 'sidebar-colors'),
	},
	{
		color: '#9fc3e6',
		displayColor: '#b2cfeb',
		selectedColor: '#356a9a',
		label: __('Blue', 'sidebar-colors'),
	},
	{
		color: '#c2abe3',
		displayColor: '#cebce9',
		selectedColor: '#634696',
		label: __('Purple', 'sidebar-colors'),
	},
	{
		color: '#e5a9cd',
		displayColor: '#eabad7',
		selectedColor: '#8c3d6c',
		label: __('Pink', 'sidebar-colors'),
	},
];

const getColorPalette = (): readonly PaletteColor[] => {
	const configuredColors = window.sidebarColorsSettings?.colors;

	if (!configuredColors) {
		return DEFAULT_COLOR_PALETTE;
	}

	return configuredColors.map((color) => ({
		color,
		displayColor: color,
		selectedColor: `color-mix(in srgb, ${color} 40%, #000)`,
		label: color,
	}));
};

export const COLOR_PALETTE = getColorPalette();

export const getEffectivePaletteColor = (
	selectors: BlockEditorSelectors,
	clientId: string,
): PaletteColor | null => {
	let currentClientId: string | null = clientId;

	while (currentClientId) {
		const color = selectors.getBlockAttributes(currentClientId)?.[COLOR_ATTRIBUTE];

		for (let index = 0; index < COLOR_PALETTE.length; index += 1) {
			const paletteColor = COLOR_PALETTE[index];

			if (paletteColor && paletteColor.color === color) {
				return paletteColor;
			}
		}

		currentClientId = selectors.getBlockRootClientId(currentClientId);
	}

	return null;
};
