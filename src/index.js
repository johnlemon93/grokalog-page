import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import renderer from './renderer';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static(__dirname + '/frontend'));

app.get('/', async (_req, res) => {
  const html = await renderer.renderHome();
  res.send(html);
});

app.get(['/about-me', '/book-corner', '/follow-me'], async (_req, res) => {
  const html = await renderer.renderAbout();
  res.send(html);
});

app.get('/p/:slug', async (req, res) => {
  const postSlug = req.params.slug;
  const html = await renderer.renderPost(postSlug);
  res.send(html);
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
