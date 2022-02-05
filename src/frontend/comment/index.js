import template from './index.html';
import './index.css';
import db from './db';

const loading = (show = true) => {
  const display = show ? 'block' : 'none';
  document.getElementById('comment-loading').style.display = display;
};

document.querySelector('section.comments').innerHTML = template;
loading(true);

const postUrl = window.location.href;
const postSlug = postUrl.split('/')[4];
const postCommentUrl = `/posts/${postSlug}/comments`;
db.getAll(postCommentUrl, 'time',
  () => loading(false),
  data => console.log(data.key, data.val().user, data.val().avatar, data.val().time, data.val().content),
);
