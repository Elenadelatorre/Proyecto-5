import './Footer.css';

export const printFooter = () => {
  document.querySelector('footer').innerHTML = `
      <p class="copyright"> ©️ 2024 Elena de la Torre </p>
  `;
};
