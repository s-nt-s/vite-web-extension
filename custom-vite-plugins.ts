import fs from 'fs';
import { resolve } from 'path';
import type { PluginOption } from 'vite';

function getDevIcons(outDir: string): string[] {
  return fs.readdirSync(outDir)
      .flatMap(file => {
        if (!file.endsWith(".png")) return [];
        if (file.includes("-dev-")) return file;
        if (file.startsWith("dev-")) return file;
        if (file.endsWith("-dev.png")) return file;
        return [];
      });
}

// plugin to remove dev icons from prod build
export function stripDevIcons (isDev: boolean) {
  if (isDev) return null

  return {
    name: 'strip-dev-icons',
    resolveId (source: string) {
      return source === 'virtual-module' ? source : null
    },
    renderStart (outputOptions: any, inputOptions: any) {
      getDevIcons(outputOptions.dir).forEach(f=>{
        fs.rm(resolve(outputOptions.dir, f), () => console.log(`Deleted ${f} from prod build`));
      });
    }
  }
}

// plugin to support i18n 
export function crxI18n (options: { localize: boolean, src: string }): PluginOption {
  if (!options.localize) return null

  const getJsonFiles = (dir: string): Array<string> => {
    const files = fs.readdirSync(dir, {recursive: true}) as string[]
    return files.filter(file => !!file && file.endsWith('.json'))
  }
  const entry = resolve(__dirname, options.src)
  const localeFiles = getJsonFiles(entry)
  const files = localeFiles.map(file => {
    return {
      id: '',
      fileName: file,
      source: fs.readFileSync(resolve(entry, file))
    }
  })
  return {
    name: 'crx-i18n',
    enforce: 'pre',
    buildStart: {
      order: 'post',
      handler() {
        files.forEach((file) => {
            const refId = this.emitFile({
              type: 'asset',
              source: file.source,
              fileName: '_locales/'+file.fileName
            })
            file.id = refId
        })
      }
    }
  }
}