export type HexColor = `#${string}`;

export interface SidebarColorsSettings {
	colors: readonly HexColor[];
}

export interface BlockAttributes {
	sidebarColorsColor?: string;
	[key: string]: unknown;
}

export interface BlockEditorSelectors {
	getBlockAttributes: (clientId: string) => BlockAttributes | undefined;
	getBlockRootClientId: (clientId: string) => string | null;
	getClientIdsWithDescendants: () => string[];
}

export interface BlockAttributeDefinition {
	default?: unknown;
	type?: string;
	[key: string]: unknown;
}

export interface BlockTypeSettings {
	attributes?: Record<string, BlockAttributeDefinition>;
	[key: string]: unknown;
}

declare global {
	interface Window {
		sidebarColorsSettings?: SidebarColorsSettings;
	}
}
