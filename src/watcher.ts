import chokidar, { FSWatcher } from 'chokidar'
import {  getPlatform, getWatcherPath, getEndName, recursionWrite, getNamingTypes } from './tool';
import { data } from './componentsCofing';
import { readdirSync } from 'fs';
export let watcher: FSWatcher | undefined
export function createWatcher() {
    watcher = chokidar.watch(getWatcherPath(), { ignoreInitial: true, depth: 0 });
    watcher.on('addDir', (p) => {
        if (readdirSync(p).length > 0) return
        // 区分是什么系统
        const split = p.split(`${getPlatform()}`)
        createDist(split[split.length - 1], p, split[split.length - 2])
    });
}

async function createDist(name: string, path: string, dir: string) {
    const { vitePaths, theDir, root } = data
    const v = vitePaths.find(({ path }) => getEndName(path) === dir) as PathInfo
    const {targetDir} = v
    const namingTypes:NamingTypes = getNamingTypes(name,v)
    if (targetDir === 'default') {
        // 使用默认模板
        recursionWrite(`${root}/${theDir}/${targetDir}`, path, getEndName(path),namingTypes)
        return
    }
    if (readdirSync(`${root}/${theDir}`).includes(targetDir)) {
        recursionWrite(`${root}/${theDir}/${targetDir}`,path,name,namingTypes)
        return
    }
    recursionWrite(`${root}/${theDir}/default`, path, name,namingTypes)
}
