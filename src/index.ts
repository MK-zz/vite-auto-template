import { ResolvedConfig } from "vite";
// 配置文件
import {watcher,createWatcher} from './watcher'
import { theTemplate } from "./theTemplate";
import { data } from "./componentsCofing";
import { convertPath, getNormalize } from "./tool";
export default function (config?: Config) {
    return {
        name: 'vite-auto-template',
        // 初次启动后
        async configResolved(resolvedConfig: ResolvedConfig) {
            watcher?.close()
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
            createWatcher()
        }
    }
}
function thePath(paths: string | (PathsObj | string)[]): PathData[] {
    if (typeof paths === 'string') return [{path:getNormalize(convertPath(paths)),targetDir:'default'}]
    const result = [] as PathsObj[];
    for (const v of paths) {
        if (typeof v === 'string') {
            result.push({
                path:getNormalize(convertPath(v)),
                targetDir:'default'
            });
        } else if (typeof v === 'object' && v !== null) {
            const { path: p } = v
            result.push({
                ...v,
                path: getNormalize((convertPath(p)))
            });
        }
    }
    return result as PathData[];
}

interface Config {
    // 监听的文件夹
    paths: string | (PathsObj | string)[]
}

interface PathsObj {
    path:string,
    targetDir?:string
    oname?:StringOrStringFunction
    hname?:StringOrStringFunction
    uname?:StringOrStringFunction
    pcname?:StringOrStringFunction
    ccname?:StringOrStringFunction
}
type StringOrStringFunction = string|((originName:string) => string)

