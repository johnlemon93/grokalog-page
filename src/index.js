import express from 'express';
import fs from 'fs';
import { promisify } from 'util';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';

import publishData from './publish.json';
import md2Html from './md2html';

const fsReadFile = promisify(fs.readFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDomain = 'blogchanhday.com';

const app = express();
app.use(express.static(__dirname + '/frontend'));
app.set('views', __dirname + '/frontend/templates');
app.set('view engine', 'twig');
// We don't need express to use a parent "page" layout
// Twig.js has support for this using the {% extends parent %} tag
app.set('view options', { layout: false });

const formatPublishedDate = str => {
  const date = moment(str).toDate();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;  
  const dateStrs = date.toDateString().split(' ');
  const prettyDateStr = `${dateStrs[0]}, ${dateStrs[1]} ${dateStrs[2]}, ${dateStrs[3]}`;

  return {
    dateStr,
    prettyDateStr,
  };
};

app.get('/', (_req, res) => {
  const postLists = publishData.years.map(year => ({
    year,
    posts: publishData.posts
      .filter(post => post.date.includes(year))
      .map(p => {
        const d = formatPublishedDate(p.date);
        return { ...p, ...d };
      })
  }));

  res.render('home', { postLists });
});

app.get(['/about-me', '/book-corner', '/follow-me'], (_req, res) => {
  res.render('about');
});

app.get('/p/:slug', async (req, res) => {
  const postSlug = req.params.slug;
  const post = publishData.posts.find(p => p.url.includes(postSlug));

  const mdData = await fsReadFile(`${__dirname}/posts/${postSlug}/index.md`);
  const postContent = md2Html(mdData);

  res.render('post', {
    title: post.title,
    content: postContent,
    likeboxSource: encodeURIComponent(`https://${blogDomain}/p/${postSlug}/index.html`),
  });
});

app.get('/p/:slug/img/:image', (req, res) => {
  res.sendFile(`${__dirname}/posts/${req.params.slug}/img/${req.params.image}`);
});

app.get('*/node_modules/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', req.url));
});

const port = process.env.PORT || 9999;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
