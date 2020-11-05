import LoadHomeContent from "../../components/Content/Home/index.js";
import { getWelcomeData } from "../../data/api/index.js";

const LoadContentDataWelcome = () => {
  const leagueID = [2021, 2019, 2002, 2015, 2003, 2017];

  getWelcomeData()
    .then((res) => {
      let contentHTML = "";
      res.competitions.forEach((result) => {
        leagueID.forEach((id) => {
          if (result.id === id) {
            contentHTML += `
              <div class="col s12 l6">
                <div class="card">
                  <a href="#standing?id=${result.id}" class="navigation">
                    <div class="card-image">
                      <img class="league-image" src="/src/assets/img/${result.name}.jpg" width="50" height="300" alt="League" />
                    </div>
                    <hr/>
                    <div class="card-content">
                      <p class="league-name" id="${result.name}">${result.name}</p>
                    </div>
                  </a>
                </div>
              </div>
            `;
          }
        });
      });
      document.querySelector(".welcome-content").innerHTML = contentHTML;
      const content = document.querySelectorAll(".navigation");
      content.forEach((elem) => {
        elem.addEventListener("click", () => {
          setTimeout(() => {
            LoadHomeContent();
          }, 1);
        });
      });
    })
    .catch((err) => err);
};
export default LoadContentDataWelcome;
