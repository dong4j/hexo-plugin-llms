'use strict';

const fs = require('fs');
const path = require('path');

hexo.extend.generator.register('llms', function (locals) {
  // 获取配置，使用默认值
  const config = Object.assign({
    generate_llms_full: false,
    debug: false,
    postsHeader: hexo.config.title || 'Blog',
    description: hexo.config.description || 'This is a summary of the blog content.',
    sort: 'desc'
  }, hexo.config.llmstxt);

  const llmsFilePath = path.join(hexo.public_dir, 'llms.txt');
  const llmsFullFilePath = path.join(hexo.public_dir, 'llms-full.txt');

  // 确保 public 目录存在
  if (!fs.existsSync(hexo.public_dir)) {
    fs.mkdirSync(hexo.public_dir, { recursive: true });
  }

  let llmsContent = `# ${config.postsHeader}\n\n> ${config.description}\n\n## 文章列表\n\n`;
  let llmsFullContent = config.generate_llms_full ? llmsContent : '';

  // 根据配置决定排序方向
  const sortOrder = config.sort === 'desc' ? -1 : 1;

  locals.posts.sort('date', sortOrder)
    .filter(post => post.published !== false)
    .forEach(post => {
      const {
        title,
        raw,
        description,
        source,
      } = post;

      // 获取文件名（不含路径）
      const fileName = path.basename(post.permalink).replace(/\.html$/, '.md');
      // 生成新的 markdown 链接和目标文件路径
      const markdownLink = post.permalink.replace(/\.html$/, '.md');
      const targetPath = path.join(hexo.public_dir, 'posts', fileName);
      
      // 确保 posts 目录存在
      const postsDir = path.join(hexo.public_dir, 'posts');
      if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
      }

      // 移除 Front-matter，获取文章内容
      const content = raw.replace(/^---[\s\S]+?---\n/, '').trim();

      // 将原始 markdown 文件写入到 public/posts 目录
      try {
        fs.writeFileSync(targetPath, content);
        if (config.debug) {
          console.log(`复制 Markdown 文件到: ${targetPath}`);
        }
      } catch (err) {
        console.error(`写入 Markdown 文件失败: ${targetPath}`, err);
      }

      // 生成 llms.txt 的内容
      llmsContent += `- [${title}](${markdownLink}): ${description}\n`;
      
      // 只在需要时生成完整文档
      if (config.generate_llms_full) {
        llmsFullContent += `## [${title}](${markdownLink})\n\n${content}\n\n`;
      }
    });

  // 写入文件前确保目录存在
  try {
    fs.writeFileSync(llmsFilePath, llmsContent);
    if (config.debug) {
      console.log('生成 llms.txt 成功');
    }

    if (config.generate_llms_full) {
      fs.writeFileSync(llmsFullFilePath, llmsFullContent);
      if (config.debug) {
        console.log('生成 llms-full.txt 成功');
      }
    }
  } catch (err) {
    console.error('写入文件时发生错误:', err);
  }
});

