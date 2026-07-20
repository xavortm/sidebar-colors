<?php
/**
 * Main plugin class.
 *
 * @package SidebarColors
 */

namespace SidebarColors;

/**
 * Registers the plugin with WordPress.
 */
final class Plugin {

	/**
	 * Register WordPress hooks.
	 *
	 * @return void
	 */
	public function setup(): void {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
	}

	/**
	 * Enqueue the block editor bundle.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets(): void {
		$script_path = SIDEBAR_COLORS_PATH . 'dist/js/editor.js';

		if ( ! file_exists( $script_path ) ) {
			return;
		}

		$asset_path = SIDEBAR_COLORS_PATH . 'dist/js/editor.asset.php';
		$asset      = file_exists( $asset_path )
			? require $asset_path
			: array(
				'dependencies' => array(),
				'version'      => SIDEBAR_COLORS_VERSION,
			);

		wp_enqueue_script(
			'sidebar-colors-editor',
			SIDEBAR_COLORS_URL . 'dist/js/editor.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}
}
