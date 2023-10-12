import { mkdirSync, existsSync, copyFileSync, readdirSync } from "fs";
import path from "path";
import { data } from "./componentsCofing";
const {dirname} = data
const ROOT = process.cwd()

export function theTemplate() {
    try {
        if (existsSync(`${ROOT}/_vac_template`)) return
        mkdirSync(`${ROOT}/_vac_template`)
        readdirSync(`${dirname}/ejs`).map(v => {
            const sourceFile = path.join(`${dirname}/ejs`, v);
            const targetFile = path.join(`${ROOT}/_vac_template/`, v);
            copyFileSync(sourceFile, targetFile)
        })
    } catch (error) {
        console.log('error', error)
    }
}