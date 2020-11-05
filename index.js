import LoadHomeContent from "./src/components/Content/Home/index.js";
import LoadWelcomeContent from "./src/components/Content/Welcome/index.js";
import Footer from "./src/components/Footer/index.js";

document.addEventListener("DOMContentLoaded", () => {
  let page = window.location.hash;

  if (page === "") {
    LoadWelcomeContent();
  } else {
    LoadHomeContent();
  }

  Footer();
});
