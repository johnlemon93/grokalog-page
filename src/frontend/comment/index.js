import html from './index.html';
import './index.css';
import api from './api';
import auth from './auth';

const anonymousAvatar = '/assets/images/elizabeth.jpg';
const anonymousUsername = 'Khách ghé chơi';
let currentUser = { displayName: anonymousUsername, photoURL: anonymousAvatar };

const postUrl = window.location.href;
const postSlug = postUrl.split('/')[4];

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

const template = html.replaceAll('$avatar', anonymousAvatar);
document.querySelector('section.comments').innerHTML = template;
loading(true);

const cmtListElem = document.getElementById('comment-list');
const cmtItemTpl = cmtListElem.querySelector('li');
cmtItemTpl.remove(); // remove the template code

const handleCommentAdded = comment => {
  const avatar = comment.avatar;
  const author = comment.author;
  const d = new Date(comment.time);
  const commentTime = d.toLocaleTimeString() + ' ' + d.toLocaleDateString();
  let fileredContent = encodeHTML(comment.content);
  fileredContent = filterURLinComment(fileredContent);

  const cmtItemElem = cmtItemTpl.cloneNode(true);
  cmtItemElem.style.removeProperty('display');
  cmtItemElem.querySelector('.avatar > img').src = avatar;
  cmtItemElem.querySelector('.metadata > b').innerHTML = author;
  cmtItemElem.querySelector('.metadata > span').innerHTML = commentTime;
  cmtItemElem.querySelector('.content').innerHTML = fileredContent;

  cmtListElem.appendChild(cmtItemElem);
};
api.getAll(
  postSlug,
  () => loading(false),
  handleCommentAdded,
);

const cmtBoxElem = document.getElementById('comment-box');
const loginBoxElem = document.getElementById('login-box');
loginBoxElem.querySelector('button').onclick = () => {
  auth.loginWithGoogle();
};
auth.onAuthStateChanged('loginBox', (authState, user) => {
  currentUser = user ? user : currentUser;
  const display = authState === auth.AuthState.No ? 'block' : 'none';
  loginBoxElem.style.display = display;

  if (user) {
    cmtBoxElem.querySelector('img').src = user.photoURL;
  }
});

const cmtInputElem = cmtBoxElem.querySelector('textarea');
const cmtInputOnKeyUp = e => {
  if (e.target.scrollHeight <= 50) {
    return;
  }

  e.target.style.height = '5px';
  e.target.style.height = (e.target.scrollHeight + 10) + 'px';
};

const cmtInputOnKeyDown = e => {
  let keyCode = e.which || e.keyCode;
  let ctrlCode = e.ctrlKey || e.metaKey;
  const comment = cmtInputElem.value;

  if (keyCode !== 13 || !ctrlCode) {
    return;
  }

  let commentData = {
    author: currentUser.displayName,
    avatar: currentUser.photoURL,
    time: (new Date()).getTime(),
    content: encodeHTML(comment),
  };

  loading(true);// TODO show loading/blurring effect
  api.create(postSlug, commentData, 
    () => loading(false), // TODO off loading/blurring effect
    cmt => {
      handleCommentAdded(cmt);
      cmtInputElem.value = '';
    },
  );
};

cmtInputElem.addEventListener('keyup', cmtInputOnKeyUp);
cmtInputElem.addEventListener('keydown', cmtInputOnKeyDown);
