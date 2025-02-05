# hexo-plugin-llmstxt

一个 Hexo 插件，用于生成适合 LLMs (Large Language Models) 训练的文本文件。该插件会将你的博客文章转换为纯文本格式，并保存为易于处理的文件。

## 特性

- 生成包含文章摘要的 `llms.txt` 文件
- 可选生成包含完整文章内容的 `llms-full.txt` 文件
- 自动保存原始 Markdown 文件到 public/posts 目录
- 支持文章排序
- 自动过滤草稿文章
- 移除 Front-matter，保留纯文本内容
- 支持调试模式

## 安装

```bash
npm install hexo-plugin-llmstxt --save
```

## 配置

在 Hexo 的 `_config.yml` 文件中添加以下配置（所有配置项都是可选的）：

```yaml
llmstxt:
  generate_llms_full: false # 是否生成包含完整文章内容的文件
  debug: false # 是否开启调试模式
  postsHeader: "" # 文档标题，默认使用站点标题
  description: "" # 文档描述，默认使用站点描述
  sort: "desc" # 文章排序方式，可选 'desc' 或 'asc'
```

### 配置说明

- `generate_llms_full`: 设置为 `true` 时会生成 `llms-full.txt` 文件，包含所有文章的完整内容
- `debug`: 设置为 `true` 时会输出文件生成的详细日志
- `postsHeader`: 生成文件的标题，如果不设置则使用站点配置中的 title
- `description`: 生成文件的描述，如果不设置则使用站点配置中的 description
- `sort`: 文章排序方式，`desc` 为降序（新到旧），`asc` 为升序（旧到新）

## 生成的文件

插件会在 `public` 目录下生成以下文件：

1. `llms.txt`: 包含所有文章的标题、链接和描述
2. `llms-full.txt`: （可选）包含所有文章的完整内容
3. `posts/*.md`: 所有文章的原始 Markdown 文件

### 文件格式示例

`llms.txt` 的格式如下：

```markdown
# 站点标题

> 站点描述

## 文章列表

- [文章标题 1](链接1): 文章描述 1
- [文章标题 2](链接2): 文章描述 2
```

`llms-full.txt` 的格式如下：

```markdown
# 站点标题

> 站点描述

## 文章列表

## [文章标题 1](链接1)

文章 1 的完整内容...

## [文章标题 2](链接2)

文章 2 的完整内容...
```

## 注意事项

1. 插件会自动过滤掉标记为草稿的文章
2. 生成的 Markdown 文件不包含 Front-matter
3. 所有文章的原始 Markdown 文件会保存在 `public/posts` 目录下
4. 文章链接会自动从 `.html` 转换为 `.md`

## License

MIT
