import { marked } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false, // IMPORTANT, because we do MathJax before markdown,
  // however we do escaping in 'CreatePreview'.
  smartLists: true,
  smartypants: false,
  highlight: (code, lang) => {
    return hljs.highlight(code, { language: lang }).value;
  },
  langPrefix: 'hljs lang-',
});

export default function md2Html(mdData) {
  let markdownPost = mdData.toString('utf8');
  markdownPost = markdownPost.replace(/<cover>/g, '<div class="cover" style="background-image:url(');
  markdownPost = markdownPost.replace(/<\/cover>/g, '"></div><div class="cover-holder"></div>');
  markdownPost = markdownPost.replace(/<math>/g, '<pre class="math">$$');
  markdownPost = markdownPost.replace(/<\/math>/g, '$$</pre>');

  const renderer = new marked.Renderer();
  const toc = [];
  renderer.heading = (text, level, raw, slugger) => {
    const anchor = slugger.slug(raw);
    toc.push({
      anchor: anchor,
      level: level,
      text: text
    });
    return `<h${level} id="${anchor}">${text}</h${level}>\n`;
  };

  let postContent = marked(markdownPost, { renderer });
  postContent = postContent.replace(/<h1/, '<h1 itemprop="name headline"');
  postContent = postContent.replace(/div class='published'/, 'div class="published" itemprop="datePublished"');
  
  // TODO generate TOC
  console.log(toc);

  return postContent;
}
