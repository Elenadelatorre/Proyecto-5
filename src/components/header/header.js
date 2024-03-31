import './header.css';

export const printHeader = () => {
  document.querySelector(
    'header'
  ).innerHTML = `<section id="header"><h1>HAVE FUN WITH ME!</h1></section>`;
};
