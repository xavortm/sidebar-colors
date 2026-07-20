#!/usr/bin/env bash

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

plugin_version="$(sed -nE 's/^ \* Version:[[:space:]]+([^[:space:]]+).*$/\1/p' sidebar-colors.php)"
package_version="$(node -p "require('./package.json').version")"
release_version="${1:-$plugin_version}"

if [[ ! "$release_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+([-.][0-9A-Za-z.-]+)?$ ]]; then
	echo "Invalid release version: $release_version" >&2
	exit 1
fi

if [[ "$plugin_version" != "$package_version" || "$plugin_version" != "$release_version" ]]; then
	echo "Version mismatch: plugin=$plugin_version package=$package_version release=$release_version" >&2
	exit 1
fi

required_files=(
	"dist/css/editor-styles.asset.php"
	"dist/css/editor-styles.css"
	"dist/js/editor.asset.php"
	"dist/js/editor.js"
)

for file in "${required_files[@]}"; do
	if [[ ! -f "$file" ]]; then
		echo "Missing release asset: $file. Run pnpm build first." >&2
		exit 1
	fi
done

build_dir="$root/build"
package_dir="$build_dir/sidebar-colors"
archive="$build_dir/sidebar-colors-$release_version.zip"

rm -rf "$build_dir"
mkdir -p "$package_dir"

cp LICENSE README.md sidebar-colors.php "$package_dir/"
cp -R dist src "$package_dir/"

(
	cd "$build_dir"
	zip -qr "$archive" sidebar-colors
)

echo "$archive"
