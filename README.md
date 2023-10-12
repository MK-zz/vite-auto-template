# vite-auto-template

`vite-auto-template` 是一个专为 Vite 构建工具设计的插件，它可以自动化生成组件模板，减轻手动创建组件的工作负担。在大型项目中，自动生成指定组件模板。统一模板要求，这个插件尤其有用。

## 功能特点

- 自动监听指定的文件夹以检测文件夹变化
- 创建文件夹，会生成对应的`vue`模板文件
- 支持自定义模板
- 支持自定义附件文件夹


## 安装

您可以使用 npm 或 yarn 安装 `vite-auto-template` 插件：

```bash
npm install vite-auto-template --save-dev
# 或
yarn add vite-auto-template --dev
```

## 使用方法

要在您的 Vite 项目中使用 `vite-auto-template` 插件，请按照以下步骤操作：

**配置插件**  `vite.config.ts`
``` typescript
import { defineConfig } from 'vite';
import TemplateAuto from 'vite-auto-template';

export default defineConfig({
  // ... 其他 Vite 配置选项

  plugins: [
    // 默认监听components文件夹
    TemplateAuto(),
  ],
});
```

**运行你的项目，`vite-auto-template` 插件将自动监听指定文件夹中的创建，自动创建组件模板**

## 配置选项

- `paths`（`string` 或 `string|PathsObj[]`）：要监听变化的文件夹。可以是单个字符串或`字符串 对象`数组
 - 可以使用自己配置的路径别名或相对路径 例如`@/components` `src/components`
- `PathsObj`
   - `path` ( `string`) : 监听的路径 **必填**
   - `dir` ( `string[]`) : 需要自定义的文件夹名称
   - `template` ( `string`) :自定义模板地址

## 模板`Ejs`说明
- `name` 模板名称


## 进阶方法
- 字符串方法
  ``` typescript
    TemplateAuto({
      paths:'@/components'
    })
  ```
- 数组(字符串)方法
  ``` typescript
  TemplateAuto({
    paths:['@/components','src/views']
  })
  ```
- 数组(字符串||对象)方法
  ``` typescript
  TemplateAuto({
    paths:[
      {
        path:'@/components',
        dir:['hooks','types'],//自定义文件夹名称
        template:'_vac_template/components.vue.ejs' //自定义模板路径
      },
      'src/views'
    ]
  })
  ```
- 修改默认模板 `_vac_template->template.vue.ejs`
