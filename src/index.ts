import { ResolvedConfig } from "vite";
// 配置文件
import watcher from './watcher'
import { theTemplate } from "./theTemplate";
import path from "path";
import { data } from "./componentsCofing";
import { convertPath } from "./tool";
export default function (config?: Config) {
    return {
        name: 'vite-auto-components',
        // 初次启动后
        async configResolved(resolvedConfig: ResolvedConfig) {
            if (resolvedConfig.env.PROD) return
            data.alias = resolvedConfig.resolve.alias
            if (config) {
                const { paths } = config
                data.vitePaths = thePath(paths)

            } else {
                data.vitePaths = thePath('src/components')
            }
            // 初始化模板
            theTemplate()
            watcher()
        }
    }
}
function thePath(paths: string | (PathsObj | string)[]): PathData[] {
    if (typeof paths === 'string') return [path.normalize(convertPath(paths))]
    const result = [] as (PathsObj | string)[];
    for (const v of paths) {
        if (typeof v === 'string') {
            result.push(path.normalize(convertPath(v)));
        } else if (typeof v === 'object' && v !== null) {
            const { path: p, dir, template } = v
            result.push({
                path: path.normalize(convertPath(p)),
                dir, template
            });
        }
    }
    return result;

}

interface Config {
    // 监听的文件夹
    paths: string | (PathsObj | string)[]
}

interface PathsObj {
    path: string
    dir?: string[]
    template?: string
}


