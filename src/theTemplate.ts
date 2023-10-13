import {existsSync} from "fs";
import { data } from "./componentsCofing";
import { createMkdir, recursionCopy } from "./tool";
const { dirname } = data
const ROOT = process.cwd()

export function theTemplate() {
    try {
        if (existsSync(`${ROOT}/_vac_template`)) return
        createMkdir(`${ROOT}/_vac_template`)
        recursionCopy(`${dirname}/template`, `${ROOT}/_vac_template`)
    } catch (error) {
        console.log('error', error)
    }
}