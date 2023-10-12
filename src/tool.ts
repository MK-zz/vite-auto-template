import { writeFileSync, mkdirSync } from "fs";
import { data } from "./componentsCofing";
const ROOT = process.cwd()
// 创建文件
export function createFile(filePath: string, fileContent: string) {
    try {
        // 使用 writeFileSync 方法创建文件并写入内容
        writeFileSync(filePath, fileContent);
    } catch (err) {
        console.error('写入文件时出错：', err);
    }
}
// 创建文件夹
export async function createMkdir(directoryPath: string) {
    try {
        // 使用 writeFileSync 方法创建文件并写入内容
        mkdirSync(directoryPath);
    } catch (err) {
        console.error('文件夹出错：', err);
    }
}

// 验证别名
export function convertPath(path: string) {
    const { alias } = data
    const split = path.split('/')
    // 检查是否是别名
    const obj = alias.find(({ find }) => find === split[0])
    if (obj) {
        const _ = path.split(`${obj.find}`).join('')
        return `${obj.replacement}${_}`
    }
    return `${ROOT}/${path}`
}
// 首字母大写
export function capitalizeFirstWord(str: string) {
    return str.replace(/^\w/, (match) => match.toUpperCase());
}
// 扁平化path
// export function c (){
    
    // data.vitePaths.map((v) => {
    //     if (typeof v === 'string') return v
    //     const { path, dir, template } = v
    //     const split = path.split(`${platform() === 'win32' ? '\\' : '/'}`)
    //     obj[split[split.length - 1]] = { dir: dir || [], template: template || '' }
    //     return path
    //   })
// }