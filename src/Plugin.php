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
		add_filter( 'register_block_type_args', array( $this, 'register_color_attribute' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
	}

	/**
	 * Add the persisted color attribute to every registered block.
	 *
	 * @param array<string, mixed> $args Block type registration arguments.
	 * @return array<string, mixed>
	 */
	public function register_color_attribute( array $args ): array {
		$attributes = isset( $args['attributes'] ) && is_array( $args['attributes'] )
			? $args['attributes']
			: array();

		if ( ! isset( $attributes['sidebarColorsColor'] ) ) {
			$attributes['sidebarColorsColor'] = array(
				'type'    => 'string',
				'default' => '',
			);
		}

		$args['attributes'] = $attributes;

		return $args;
	}

	/**
	 * Enqueue the block editor bundle.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets(): void {
		$script_path = SIDEBAR_COLORS_PATH . 'dist/js/editor.js';

		if ( file_exists( $script_path ) ) {
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

			wp_set_script_translations( 'sidebar-colors-editor', 'sidebar-colors' );

			$theme_colors = $this->get_theme_colors();

			if ( null !== $theme_colors ) {
				wp_add_inline_script(
					'sidebar-colors-editor',
					'window.sidebarColorsSettings = ' . wp_json_encode(
						array( 'colors' => $theme_colors ),
						JSON_HEX_TAG | JSON_UNESCAPED_SLASHES
					) . ';',
					'before'
				);
			}
		}

		$style_path = SIDEBAR_COLORS_PATH . 'dist/css/editor-styles.css';

		if ( file_exists( $style_path ) ) {
			$style_asset_path = SIDEBAR_COLORS_PATH . 'dist/css/editor-styles.asset.php';
			$style_asset      = file_exists( $style_asset_path )
				? require $style_asset_path
				: array( 'version' => SIDEBAR_COLORS_VERSION );

			wp_enqueue_style(
				'sidebar-colors-editor',
				SIDEBAR_COLORS_URL . 'dist/css/editor-styles.css',
				array(),
				$style_asset['version']
			);
		}
	}

	/**
	 * Get a theme-provided replacement color palette.
	 *
	 * @return array<int, string>|null Configured colors, or null when not configured.
	 */
	private function get_theme_colors(): ?array {
		$theme_data     = \WP_Theme_JSON_Resolver::get_theme_data()->get_raw_data();
		$sidebar_colors = $theme_data['settings']['custom']['sidebarColors'] ?? null;

		if ( ! is_array( $sidebar_colors ) || ! array_key_exists( 'colors', $sidebar_colors ) ) {
			return null;
		}

		$theme_colors = $sidebar_colors['colors'];

		if ( ! is_array( $theme_colors ) ) {
			return null;
		}

		$colors = array();

		foreach ( $theme_colors as $theme_color ) {
			if ( ! is_string( $theme_color ) ) {
				continue;
			}

			$color = sanitize_hex_color( $theme_color );

			if ( $color ) {
				$colors[] = $color;
			}
		}

		return $colors;
	}
}
