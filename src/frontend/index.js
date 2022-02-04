import hljs from 'highlight.js';

hljs.highlightAll.called = false;
hljs.highlightAll();

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
