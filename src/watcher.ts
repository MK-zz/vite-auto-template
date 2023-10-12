import chokidar from 'chokidar'
import { platform } from 'os';
import { renderFile } from 'ejs'
import { capitalizeFirstWord, convertPath, createFile, createMkdir } from './tool';
import path from 'path';
import { data } from './componentsCofing';
import { readdirSync } from 'fs';
const ROOT = process.cwd()

const map = { path: '/index.vue', type: 'vue', ejs: `${ROOT}/_vac_template/template.vue.ejs` }
export default function watcher() {
  const obj: { [key: string]: { dir: string[], template: string } } = {}
  const c = data.vitePaths.map((v) => {
    if (typeof v === 'string') return v
    const { path, dir, template } = v
    const split = path.split(`${platform() === 'win32' ? '\\' : '/'}`)
    obj[split[split.length - 1]] = { dir: dir || [], template: template || '' }
    return path
  })
  const watcher = chokidar.watch(c, { ignoreInitial: true , depth: 0});
  watcher.on('addDir', (p) => {
    // 区分是什么系统
    const split = p.split(`${platform() === 'win32' ? '\\' : '/'}`)
    createDist(split[split.length - 1], p, split[split.length - 2])
    return

  });
  async function createDist(name: string, path: string, dir: string) {
    let ejsPath = map.ejs
    for (const key in obj) {
      if (key === dir) {
        for (const v of obj[key]['dir']) {
          await createMkdir(`${path}/${v}`)
        }
        ejsPath = await theEjs(obj[key]['template'])
      }
    }
    data.dMap.push({ key: capitalizeFirstWord(name), value: `./${dir}/${name}/${capitalizeFirstWord(name)}.vue` })
    createFile(
      `${path}/${capitalizeFirstWord(name)}.vue`,
      await renderFile(
        ejsPath, //读取ejs 数据
        {
          // 生成入口名称
          name: `${capitalizeFirstWord(name)}Vue`
        }
      )
    )
  }

}
async function theEjs(s?: string) {
  if (s) return path.normalize(convertPath(s))
  return map.ejs
}
