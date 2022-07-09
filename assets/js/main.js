const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;
const incrementCounter = (label, cn) => {
  const counter = cn + 1;

  cartCounterLabel.innerHTML = `${counter}`;

  if (cartCounter === 1) {
    cartCounterLabel.style.display = 'block';
  }

  return counter;
};


const getMockData = (t) => +t.parentElement.previousElementSibling.innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const disableControls = (t, el, fn) => {
  t.disabled = true;
  el.removeEventListener('click', fn);
};
const enableControls = (t, el, fn) => {
  t.disabled = false;
  el.addEventListener('click', fn);
};

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;
  let restoreHTML = null;

  if (typeof target !== 'object') {
    console.error('target is not object');
    return;
  }
  if (target.matches('.item-actions__cart')) {
    cartCounter = incrementCounter(cartCounterLabel, cartCounter);
    cartPrice = getPrice(target, cartPrice);
    restoreHTML = target.innerHTML;
    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

    disableControls(target, contentContainer, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      enableControls(target, contentContainer, btnClickHandler);
    }, interval)
  }
};

contentContainer.addEventListener('click', btnClickHandler);