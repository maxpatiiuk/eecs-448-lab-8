// Render images
const imgDir = './imgs/';
const imgCount = 30;
const imgExt = '.jpg';

const images = Array.from(
  { length: imgCount },
  (_, imgIndex) => `${imgDir}${imgIndex + 1}${imgExt}`
);

const shuffledImages = images.sort(() => 0.5 - Math.random());

const main = document.getElementsByTagName('main')[0];

// Repeat the last and first image again for the sake of wrapping around
const repeatedImages = [
  shuffledImages.slice(-1)[0],
  ...shuffledImages,
  shuffledImages[0],
];

main.innerHTML = repeatedImages
  .map((src) => `<img alt="" src="${src}">`)
  .join('');

// Display 2nd image by default
const slider = document.getElementById('slider');
const initialImage = 2;
slider.scrollLeft = slider.clientWidth * (initialImage - 1);

// Listen for scroll
let lastScrollPosition = slider.scrollLeft;
slider.addEventListener('scroll', () => {
  if (slider.scrollLeft === lastScrollPosition) return;
  if (
    slider.scrollLeft < slider.clientWidth &&
    slider.scrollLeft < lastScrollPosition
  )
    slider.scrollLeft =
      slider.scrollWidth - (slider.clientWidth - slider.scrollLeft);
  else if (
    slider.scrollWidth - slider.scrollLeft < slider.clientWidth * 2 &&
    slider.scrollLeft > lastScrollPosition
  )
    slider.scrollLeft %= slider.clientWidth;
  lastScrollPosition = slider.scrollLeft;
});

// Listen for button clicks
function scroll(isRight) {
  const mod = slider.scrollLeft % slider.clientWidth;
  const nonNullMod = mod || slider.clientWidth;
  let scrollLeft = slider.scrollLeft;
  if (isRight) scrollLeft += slider.clientWidth - mod;
  else scrollLeft -= nonNullMod;
  let index = scrollLeft / slider.clientWidth;
  if (index === 0) index = imgCount;
  else if (index - 1 === imgCount) index = 1;
  slider.scrollLeft = index * slider.clientWidth;
}

let buttons = Array.from(document.body.querySelectorAll('button'));
const handleClick = ({ target }) =>
  scroll(buttons.indexOf(target.closest('button')) === 1);

buttons.map((button) => button.addEventListener('click', handleClick));

// Hide overlay
document.body.addEventListener(
  'click',
  () => document.getElementById('overlay').remove(),
  { once: true }
);
