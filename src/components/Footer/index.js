const Footer = () => {
  const content = document.querySelector(".footer");
  fetch("/src/pages/Footer/index.html")
    .then(res => res.text())
    .then(res => content.innerHTML = res);
};

export default Footer;