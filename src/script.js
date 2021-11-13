const blob = document.getElementById('blob');

const handleMouseOver = ({ target }) =>
  blob.style.setProperty('--accent', target.getAttribute('data-color'));

Array.from(document.getElementsByTagName('a'), (link) =>
  link.addEventListener('mouseover', handleMouseOver)
);
