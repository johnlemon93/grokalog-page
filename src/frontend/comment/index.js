import template from './index.html';
import './index.css';
import db from './db';

const postUrl = window.location.href;
const postSlug = postUrl.split('/')[4];
const postCommentUrl = `/posts/${postSlug}/comments`;

const loading = (show = true) => {
  const display = show ? 'block' : 'none';
  document.getElementById('comment-loading').style.display = display;
};

const encodeHTML = str => {
  return str.replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;');
};

const filterURLinComment = comment => {
  return comment.replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g, '<a target=\'_blank\' rel=\'noopener noreferrer\' href=\'$1\'>$1</a>');
};

document.querySelector('section.comments').innerHTML = template;
loading(true);

const cmtListElem = document.getElementById('comment-list');
const cmtItemTpl = cmtListElem.querySelector('li');
cmtItemTpl.remove(); // remove the template code

db.getAll(postCommentUrl, 'time',
  () => loading(false),

  data => {
    const avatar = data.val().avatar;
    const username = data.val().user;
    const d = new Date(data.val().time);
    const commentTime = d.toLocaleTimeString() + ' ' + d.toLocaleDateString();
    let fileredContent = encodeHTML(data.val().content);
    fileredContent = filterURLinComment(fileredContent);

    const cmtItemElem = cmtItemTpl.cloneNode(true);
    cmtItemElem.style.display = 'block';
    cmtItemElem.querySelector('.avatar > img').src = avatar;
    cmtItemElem.querySelector('.metadata > b').innerText = username;
    cmtItemElem.querySelector('.metadata > span').innerText = commentTime;
    cmtItemElem.querySelector('.content').innerText = fileredContent;

    cmtListElem.appendChild(cmtItemElem);
  },
);
