# vite-auto-template 专为 Vite 构建工具设计的插件

`vite-auto-template` 是一个专为 Vite 构建工具设计的插件，其主要功能是自动监视指定文件夹的变化并生成特定的模板文件。这个插件旨在提供一种便捷的方式，让开发者能够在项目开发过程中自动化地生成模板文件，从而提高工作效率。

[English](/README.en.md)

## 插件的核心功能

*   **自动文件夹监视** 自动监视您指定的文件夹，但它的焦点是在新增文件夹时立即检测到变化。一旦新文件夹出现，插件会自动响应并触发生成特定模板的操作。
*   **自定义模板**  您可以定义要生成的模板文件的结构和内容，以适应您的项目需求。这样，您可以确保生成的文件符合项目规范和标准。
*   **自动化生成** 当插件检测到新增文件夹时，它将自动启动模板生成过程，无需手动干预。这对于需要为每个新功能或模块创建相似文件夹结构的任务非常有用。
*   **提高生产力** 自动模板生成功能可以显著提高开发人员的生产力，减少了手动创建文件夹和文件的重复工作，同时减少了出错的机会。

## 效果展示

![vite-auto.template.gif](https://gitee.com/xiaotaibai123/vite-auto-template/raw/master/public/vite-auto.template.gif)

## 安装

您可以使用 npm 或 yarn 安装 `vite-auto-template` 插件：
``` 
npm install vite-auto-template --save-dev
# 或
yarn add vite-auto-template --dev
```

## 快速开始
要在您的 Vite 项目中使用 `vite-auto-template` 插件，请按照以下步骤操作：

**配置插件** `vite.config.ts`
``` ts
import { defineConfig } from 'vite';
import AutoTemplate from 'vite-auto-template';

export default defineConfig({
  // ... 其他 Vite 配置选项

  plugins: [
    // 默认监听components文件夹并使用默认模板
    AutoTemplate(),
  ],
});
```
`无需手动创建，自动生成模板`

## 配置选项

|  名称   | 类型  |描述|
|  ----  | ----  |--|
| paths  | `string``PathsObj[]`|默认监听`components`文件夹,支持`string`，`string[]`，`string PathsObj[]`|
- PathsObj
    |  名称   | 类型 |默认 |描述|
    |  ----  | ----  |--|---|
    | path  | `string`|必填|路径|
    | targetDir  | `string`|非必填|填写`_vac_template`文件夹下文件名，识别不到使用默认模板|
    | oname  | `StringOrStringFunction`|非必填|原始命名占位符|
    | hname  | `StringOrStringFunction`|非必填|横杠命名占位符|
    | uname  | `StringOrStringFunction`|非必填|下划线命名占位符|
    | pcname  | `StringOrStringFunction`|非必填|大驼峰命名占位符|
    | ccname  | `StringOrStringFunction`|非必填|小驼峰命名占位符|
- StringOrStringFunction `string|((originName:string) => string)`
  
## Ejs 模板说明
|  名称   | 类型  |描述|
|  ----  | ----  |--|
| oname  | `string`|原始命名占位符|
| hname  | `string`|横杠命名占位符|
| uname  | `string`|下划线命名占位符|
| pcname  | `string`|大驼峰命名占位符|
| ccname  | `string`|小驼峰命名占位符|

## 进阶用法案例
- 字符串 
    ``` ts
    AutoTemplate(
      {
        paths:'@/components',//默认使用default模板
      }
    )
    ```
 - 字符串数组 
    ``` ts
    AutoTemplate(
      {
        paths:['@/components']//默认使用default模板
      }
    )
    ```
 - 对象数组 
     ```ts
     AutoTemplate(
      {
        paths:[{
          path:'@/components'//默认使用default模板
        },{
          path:'@/views',
          targetDir:'views'//使用_vac_template 下的views模板，匹配不到使用默认模板
        }]
      }
    )
     ```
  - 字符串 对象 数组
    ``` ts
    AutoTemplate(
      {
        paths:[
          '@/components',
          {
            path:'@/views',
            targetDir:'views'//使用_vac_template 下的views模板，匹配不到使用默认模板
          }
        ]
      }
    )
    ```

## 更新日志
- **v1.0.0** :支持自定义命名规范，支持更多自定义模板

## 其他插件
| 名称| 描述|
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [vite-auto-pinia](https://www.npmjs.com/package/vite-auto-template) | 专为 Vite 构建工具设计的插件，它可以自动为你生成 Pinia 文件，同时支持热更新入口配置。 