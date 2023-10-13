import { FSWatcher } from "chokidar";
import path from "path";
import { fileURLToPath } from "url";
import { Alias } from "vite";

export const data = {
    vitePaths: [] as PathData[],
    alias: [] as Alias[],
    root: process.cwd(),
    dMap: [] as { key: string, value: string }[],
    dirname: __dirname || path.dirname(fileURLToPath(import.meta.url)),
    theDir:'_vac_template',
    watcher:{} as FSWatcher |undefined
}
