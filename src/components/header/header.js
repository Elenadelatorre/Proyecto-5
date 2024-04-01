import './header.css';

export const printHeader = () => {
  document.querySelector(
    'header'
  ).innerHTML = `<section id="header"><h1>ENJOY WITH FRIENDS!</h1></section>`;
};
