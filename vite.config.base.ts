import { resolve } from 'path';
import { ManifestV3Export } from '@crxjs/vite-plugin';
import { defineConfig, BuildOptions } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import { stripDevIcons, crxI18n } from './custom-vite-plugins';
import manifest from './manifest.json';
import pkg from './package.json';

// set this flag to true, if you want localization support
const localize = true;

const isDev = process.env.__DEV__ === 'true';

function setDevIcon<T extends {[key: string]: string}>(obj: T) {
  const new_obj = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value.replace(".png", "-dev.png"),
    ])
  ) as T;
  return new_obj;
}

if (isDev) {
  manifest.action.default_icon = setDevIcon(manifest.action.default_icon);
  manifest.icons = setDevIcon(manifest.icons);
}

export const baseManifest = {
    ...manifest,
    version: pkg.version,
    homepage_url: pkg.repository.url,
    ...(localize ? {
      name: '__MSG_extName__',
      description: '__MSG_extDescription__',
      default_locale : 'en'
    } : {})
} as ManifestV3Export

export const baseBuildOptions: BuildOptions = {
  sourcemap: isDev,
  emptyOutDir: !isDev
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    stripDevIcons(isDev),
    crxI18n({ localize, src: './src/locales' }),
  ],
  publicDir: resolve(__dirname, 'public'),
  build: {
    minify: !isDev
  }
});
