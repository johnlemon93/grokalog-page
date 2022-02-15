import fs from 'fs';
import { promisify } from 'util';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Twig from 'twig';

import config from '../config.json';
import publishData from './posts';
import md2Html from './md2html';

const fsReadFile = promisify(fs.readFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDomain = config.blogDomain;

const loadTmp = (name = '') => {
  const path = `${__dirname}/frontend/templates/${name}.twig`;
  return Twig.twig({ path, async: false });
};

const homeTpl = loadTmp('home');
const postTpl = loadTmp('post');
const aboutTpl = loadTmp('about');

export default {
  async renderHome() {
    const postLists = publishData.years.map(year => ({
      year,
      posts: publishData.posts.filter(post => post.date.includes(year)),
    }));

    return homeTpl.render({ postLists });
  },

  async renderPost(slug) {
    const post = publishData.posts.find(p => p.url.includes(slug));

    const mdData = await fsReadFile(`${__dirname}/posts/${slug}/index.md`);
    const postContent = md2Html(mdData);

    return postTpl.render({
      title: post.title,
      content: postContent,
      likeboxSource: encodeURIComponent(`https://${blogDomain}/p/${slug}/index.html`),
    });
  },

  async renderAbout() {
    return aboutTpl.render();
  },
};
