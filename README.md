# hanjiang.site

蒋涵（Han Jiang）的个人主页。基于 [PRISM](https://github.com/xyjoey/PRISM)（MIT 协议）改造，采用"方格纸笔记本"风格。

**日常更新只需要改 `content/` 里的文件，不需要碰代码。**

---

## 本地预览

```bash
npm install      # 第一次运行，或依赖变了之后
npm run dev      # 打开 http://localhost:3000，改 content/ 后刷新即可看到
```

## 上线

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 https://hanjiang.site（约 1–2 分钟）。
也可以在 GitHub 仓库的 Actions 页面手动点 **Run workflow**。

---

## 每块内容在哪里改

| 页面上的内容 | 文件 | 说明 |
|---|---|---|
| 顶部英文名、中文名、身份、学校 | `content/config.toml` → `[author]` | 副标题由 `title` + " at " + `institution` 拼成 |
| 顶部导航（About / Publications / Awards） | `content/config.toml` → `[[navigation]]` | 见下文"新增页面" |
| 照片 | `public/bio.jpg` | 直接替换图片 |
| 联系方式按钮 | `content/config.toml` → `[social]` | 填链接就显示，留空就隐藏 |
| 简介正文 | `content/bio.md` | Markdown，段落之间空一行 |
| Research Interests、黄色提示框 | `content/about.toml` → `[profile]` | |
| 首页显示哪些板块、顺序 | `content/about.toml` → `[[sections]]` | |
| Education | `content/education.toml` | |
| Experience | `content/experience.toml` | |
| News（目前未在首页显示） | `content/news.toml` | |
| Misc | `content/misc.toml` | |
| 论文 | `content/publications.bib` | 见下文"新增论文" |
| Awards 页 | `content/awards.toml` | |
| 访客地球 | `content/config.toml` → `visitor_map` | 留空则隐藏 |
| 网页标题、描述、图标 | `content/config.toml` → `[site]` | |

每个内容文件开头都有注释，写明了每个字段的含义和填写格式。

### 日期写法

所有日期都写成 **年-月**，页面会统一显示成 "Sep 2025" 这样的格式：

```toml
start = "2025-09"
end = "present"     # 进行中；或写具体年月，如 "2026-02"
```

News 和 Awards 只有一个时间点，写 `date = "2025-09"` 即可。

### 链接与格式

`content/` 里大部分文字支持 Markdown：链接 `[文字](https://...)`，加粗 `**文字**`。

---

## 新增论文

1. 打开 `content/publications.bib`，文件开头的 `@comment{...}` 里有一份模板。
2. 复制模板，去掉每行开头的 `% `，粘贴到所有论文的**最上面**（越新越靠前）。
3. 修改字段：
   - 作者名后加 `*` 表示共同一作，你的名字会自动高亮
   - `venue` 写会议/期刊，如 `NeurIPS 2025`、`Under Review`
   - `url` = Paper 链接，`code` = Code 链接，`website` = Project Page 链接，没有的就删掉那一行
4. 配图放到 `public/papers/`，`preview={文件名.jpg}` 只写文件名。图片建议宽 1600px 左右、JPG 格式（体积小）。

## 新增学校 / 实验室 logo

把正方形 logo 放到 `public/logos/`，在对应条目里写 `image = "/logos/文件名.png"`。

---

## 新增页面（例如 Projects）

1. 在 `content/` 新建 `projects.toml`，选一种页面类型：

   **列表页**（和 Awards 一样，左边日期、右边条目）：
   ```toml
   type = "card"
   title = "Projects"
   description = ""          # 标题下的一行说明，可选

   [[items]]
   title = "项目名"
   subtitle = "一句话说明"
   start = "2025-09"
   end = "present"
   content = "补充说明，可用 Markdown"
   link = "https://..."      # 可选
   ```

   **文章页**（一整篇 Markdown）：
   ```toml
   type = "text"
   title = "Projects"
   source = "projects.md"    # 再在 content/ 里新建 projects.md 写正文
   ```

2. 在 `content/config.toml` 末尾加一个导航项：
   ```toml
   [[navigation]]
   title = "Projects"
   type = "page"
   target = "projects"       # 和文件名一致
   href = "/projects"
   ```

保存后导航栏会出现新栏目，点进去就是新页面。

---

## 外观

| 想改的 | 位置 |
|---|---|
| 颜色（浅色 / 深色两套） | `src/app/globals.css` 开头的 "1. Theme" |
| 字体 | `src/app/globals.css` 的 `--font-*`，以及 `src/app/layout.tsx` 里加载 Google Fonts 的 `<link>` |
| 各部分的排版样式 | `src/app/globals.css` 的 "3. Components"（`.nb-*` 类名） |

当前字体：英文名 Dancing Script，中文名鸿雷行书简体（只含"蒋涵"两字，`public/fonts/`），
正文 Inter，标题 / 日期 / 标签 JetBrains Mono。

> 修改 `name_zh` 换成别的汉字时，需要重新生成中文字体文件，否则新字会显示成系统楷体。

---

## 目录结构

```
content/            所有内容（日常只改这里）
public/             图片、字体等静态文件
  bio.jpg           照片
  papers/           论文配图
  logos/            学校 / 实验室 logo
  fonts/            中文名字体
src/
  app/              页面入口、全局样式 globals.css
  components/       页面组件（home/ 首页板块，pages/ 各类页面，publications/ 论文）
  lib/              读取内容、解析 BibTeX、日期格式化等
.github/workflows/  自动部署
```
