import { Alias} from "vite";
const ROOT = process.cwd()
export function thePath(path: string | string[], alias: Alias[]) {
    if (typeof path === 'string') return convertPath(path,alias)
    const p = []
    for (const v of path) {
        p.push(convertPath(v,alias))
    }
    return p
}
function convertPath(path: string, alias: Alias[]) {
    const split = path.split('/')
    // 检查是否是别名
    const obj = alias.find(({ find }) => find === split[0])
    if (obj) {
        const _ = path.split(`${obj.find}`).join('')
        return `${obj.replacement}${_}`
    }
    return `${ROOT}${path}`
}