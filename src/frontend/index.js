import './index.css';
import './comment/firebase';
import './comment/auth';
import './comment/db';

const GATrackingId = 'UA-119883226-1';
const initGA = () => {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  window.ga('create', GATrackingId, 'auto');
  window.ga('send', 'pageview');
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hostname !== 'localhost') {
    initGA();
  }
});

document.querySelectorAll('section.year > div.header').forEach(elem => {
  const cc = 'collapse';
  elem.addEventListener('click', e => {
    e.stopPropagation();

    // seciton.year > div.header > i.button
    let p = e.target.parentElement;
    if (p.tagName !== 'SECTION') {
      p.click();
      return;
    }

    if (p.classList.contains(cc)) {
      p.classList.remove(cc);
      return;
    }

    p.classList.add(cc);
  });
});

const goTopButton = document.getElementById('go-top');
if (goTopButton !== null) {
  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      goTopButton.style.display = 'block';
    } else {
      goTopButton.style.display = 'none';
    }
  });

  goTopButton.onclick = () => {
    document.getElementById('container').scrollIntoView();
  };
}
