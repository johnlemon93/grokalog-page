import fs from 'fs';
import { promisify } from 'util';
import htmlMinifier from 'html-minifier';

import publishData from '../src/posts';
import renderer from '../src/renderer';

const outDir = process.env.OUT_DIR;
const posts = publishData.posts;
const fsWriteFile = promisify(fs.writeFile);
const fsMkdir = promisify(fs.mkdir);
const fsReaddir = promisify(fs.readdir);

const minify = (html = '') => {
  return htmlMinifier.minify(html, { collapseWhitespace: true });
};

const writeDown = async (html = '', dir = '') => {
  await fsMkdir(dir, { recursive: true });
  await fsWriteFile(`${dir}/index.html`, minify(html));
};

(async () => {
  const home = await renderer.renderHome();
  await writeDown(home, outDir);

  const about = await renderer.renderAbout();
  await writeDown(about, `${outDir}/about-me`);
  await writeDown(about, `${outDir}/follow-me`);
  await writeDown(about, `${outDir}/book-corner`);

  const postDirs = await fsReaddir(`${outDir}/p`);
  const promises = postDirs.map(async postSlug => {
    const post = posts.find(p => p.url.includes(postSlug));
    if (!post) {
      throw new Error(`Dir ${postSlug} is not mapped with a post`);
    }

    const content = await renderer.renderPost(postSlug);
    await writeDown(content, `${outDir}/${post.url}`);
  });
  await Promise.all(promises);
})();
