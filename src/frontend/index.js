const s = document.createElement('script');
s.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js');
document.body.appendChild(s);

window.addEventListener('load', () => {
  window.hljs.initHighlighting.called = false;
  window.hljs.initHighlighting();
});
