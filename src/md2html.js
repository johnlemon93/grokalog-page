import { marked } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false, // IMPORTANT, because we do MathJax before markdown,
  // however we do escaping in 'CreatePreview'.
  smartLists: true,
  smartypants: false,
});

hljs.configure({
  cssSelector: 'pre code',
});

export default function md2Html(mdData) {
  let markdownPost = mdData.toString('utf8');
  // var lines = markdownPost.split('\n');
  // var title = '';
  // if (lines.length > 0) {
  //     title = lines[0].replace(/#/g, '').replace("\r\n", '').replace("\n", '');
  // }

  markdownPost = markdownPost.replace(/<cover>/g, '<div class="cover" style="background-image:url(');
  markdownPost = markdownPost.replace(/<\/cover>/g, '"></div><div class="cover-holder"></div>');
  markdownPost = markdownPost.replace(/<math>/g, '<pre class="math">$$');
  markdownPost = markdownPost.replace(/<\/math>/g, '$$</pre>');
  //markdownPost = markdownPost.replace(/--@TAGS.*\n/g, generateTags(markdownPost));

  let postContent = marked(markdownPost);
  postContent = postContent.replace(/<h1/, '<h1 itemprop="name headline"');
  postContent = postContent.replace(/div class='published'/, 'div class="published" itemprop="datePublished"');

  //postContent = hljs.highlightAuto(postContent).value;

  return postContent;
}
