import { error } from "../../../data/index.js";
import LoadContentDataWelcome from "../../../view/Welcome/index.js";

const LoadWelcomeContent = () => {
  const content = document.querySelector("#body-content");
  const root_url = "../src/pages/Welcome/";

  fetch(`${root_url}index.html`)
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else if (res.status === 404) {
        return "<h4>404</h4>";
      } else {
        return "<h4>Server not respond</h4>";
      }
    })
    .then((res) => res.text())
    .then((res) => (content.innerHTML = res))
    .then(() => {
      LoadContentDataWelcome();
    })
    .catch(error);
};

export default LoadWelcomeContent;
