import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import publishData from './publish.json';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(__dirname + '/frontend'));
app.set('views', __dirname + '/frontend/templates');
app.set('view engine', 'twig');
// We don't need express to use a parent "page" layout
// Twig.js has support for this using the {% extends parent %} tag
app.set('view options', { layout: false });

app.get('/', (_req, res) => {
  const postLists = publishData.years.map(year => {
    ({
      year: year,
      posts: publishData.posts.filter(post => post.date.includes(year))
    });
  });
  res.render('home', { postLists });
});

app.get('/p', (_req, res) => {
  res.render('post', {
    title: 'Hello World'
  });
});

const port = process.env.PORT || 9999;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
