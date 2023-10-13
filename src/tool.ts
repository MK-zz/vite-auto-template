import { writeFileSync, mkdirSync, readdirSync, statSync, copyFileSync } from "fs";
import { data } from "./componentsCofing";
import { platform } from 'os';
import path from "path";
import { renderFile } from "ejs";
/**
 * 创建文件
 * @param filePath 
 * @param fileContent 
 */
export function createFile(filePath: string, fileContent: string) {
    try {
        // 使用 writeFileSync 方法创建文件并写入内容
        writeFileSync(filePath, fileContent);
    } catch (err) {
        console.error('写入文件时出错：', err);
    }
}
/**
 * 创建文件夹
 * @param directoryPath 
 */
export async function createMkdir(directoryPath: string) {
    try {
        // 使用 writeFileSync 方法创建文件并写入内容
        mkdirSync(directoryPath);
    } catch (err) {
        console.error('文件夹出错：', err);
    }
}

/**
 * 验证别名
 * @param path 
 * @returns 
 */
export function convertPath(path: string) {
    const { alias, root } = data
    const split = path.split('/')
    // 检查是否是别名
    const obj = alias.find(({ find }) => find === split[0])
    if (obj) {
        const _ = path.split(`${obj.find}`).join('')
        return `${obj.replacement}${_}`
    }
    return `${root}/${path}`
}
/**
 * 首字母大写
 * @param str 
 * @returns 
 */
export function capitalizeFirstWord(str: string) {
    return str.replace(/^\w/, (match) => match.toUpperCase());
}
/**
 * 验证平台
 * @returns string
 */
export function getPlatform() {
    return platform() === 'win32' ? '\\' : '/'
}

/**
 * 获取监听文件夹
 * @returns string[]
 */
export function getWatcherPath() {
    const { vitePaths } = data
    return vitePaths.map((v) => {
        if (typeof v === 'string') return v
        return v.path
    })
}

/**
 * 递归拷贝
 * @param s 当前地址
 * @param goal 目标地址
 */
export function recursionCopy(s: string, goal: string) {
    try {
        // 查当前文件夹里面包含的文件
        for (const v of readdirSync(s)) {
            let p = `${s}/${v}`
            const stats = statSync(p);
            if (stats.isFile()) {
                const sourceFile = path.join(p);
                const targetFile = path.join(goal, v);
                copyFileSync(sourceFile, targetFile)
            } else if (stats.isDirectory()) {
                createMkdir(`${goal}/${v}`)
                recursionCopy(p, `${goal}/${v}`)
            }
        }
    } catch (error) {
        console.log('error', error)
    }
}

/**
 * 递归写入
 * @param s 读地址
 * @param goal 写地址
 */
export function recursionWrite(s: string, goalPath: string, folderName: string, namingTypes?: NamingTypes) {
    const template = readdirSync(s)
    if (template.length < 0) return
    for (const v of template) {
        let p = `${s}/${v}`
        const stats = statSync(p);
        // 文件
        if (stats.isFile()) {
            // 是ejs模板
            if (v.endsWith('.ejs')) {
                const regex = /\[.*\]/g
                const split = v.split('.')
                const ejsPath = `${s}/${v}`
                const options = { oname: folderName, hname: '', uname: '', pcname: '', ccname: '' }
                const goal = regex.test(v)
                    // 替换
                    ? getNormalize(`${goalPath}/${folderName}.${split[1]}`)
                    // 不替换
                    : getNormalize(`${goalPath}/${split[0]}.${split[1]}`)
                writeEjs(goal, ejsPath, namingTypes)
            } else {
                const sourceFile = path.join(p);
                const targetFile = path.join(goalPath, v);
                copyFileSync(sourceFile, targetFile)
            }
        }
        // 文件夹
        else if (stats.isDirectory()) {
            createMkdir(`${goalPath}/${v}`)
            recursionWrite(p, `${goalPath}/${v}`, folderName, namingTypes)
        }
    }
}

/**
 * 写入模板
 * @param goalPath 目标地址
 * @param ejsPath ejs地址
 * @param options 占位符
 */
export async function writeEjs(goalPath: string, ejsPath: string, options?: Object) {
    try {
        createFile(
            goalPath,
            await renderFile(
                ejsPath, //读取ejs 数据
                options
            )
        )
    } catch (error) {
        console.log('error', error)
    }
}
/**
 * 获取最后名称
 * @param p 路径
 * @returns 返回\最后的名称
 */
export const getEndName = (p: string) => path.basename(p)

/**
 * 
 * @param p 路径
 * @returns 返回统一格式路径
 */
export const getNormalize = (p: string) => path.normalize(p)

/**
 * 获取占位符数据
 * @param dirName 文件名
 * @param pathInfo 数据详情
 * @returns 占位符数据 NamingTypes 
 */
export function getNamingTypes(dirName: string, pathInfo: PathInfo) {
    const namingTypes: NamingTypes = {}
    const namingArr: (keyof NamingTypes)[] = ['oname', 'hname', 'uname', 'pcname', 'ccname']
    for (const namingName of namingArr) {
        const property = pathInfo[namingName];
        if (property) {
            if (typeof property === 'function') {
                namingTypes[namingName] = property(dirName);
            } else {
                namingTypes[namingName] = property;
            }
        } else {
            namingTypes[namingName] = namingName === 'oname' ? dirName : "";
        }
    }
    return namingTypes
}
