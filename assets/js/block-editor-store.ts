import { store as wordpressBlockEditorStore } from '@wordpress/block-editor';
import type { ReduxStoreConfig, StoreDescriptor } from '@wordpress/data';

import type { BlockAttributes } from './types';

interface RawBlockEditorSelectors {
	getBlockAttributes: (state: unknown, clientId: string) => BlockAttributes | undefined;
	getBlockRootClientId: (state: unknown, clientId: string) => string | null;
	getClientIdsWithDescendants: (state: unknown) => string[];
}

interface BlockEditorActions {
	updateBlockAttributes: (
		clientIds: string | readonly string[],
		attributes: Partial<BlockAttributes>,
	) => void;
}

type BlockEditorStore = StoreDescriptor<
	ReduxStoreConfig<unknown, BlockEditorActions, RawBlockEditorSelectors>
>;

const addStoreTypes = (store: StoreDescriptor): BlockEditorStore => store;

export const blockEditorStore = addStoreTypes(wordpressBlockEditorStore);
