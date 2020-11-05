import { day, error, month } from "../../data/index.js";
import LoadHomeContent from "../../components/Content/Home/index.js";
import { allMatch, deleteMatch } from "../../data/db/db.js";

const Saved = () => {
  const content = document.querySelector(".match");
  allMatch()
    .then((res) => {
      let contentHTML = "";
      if (res.length <= 0) {
        contentHTML = "<h2>No Matches are Saved.</h2>";
      } else {
        res.forEach((result) => {
          const date = new Date(`${result.utcDate}`);
          contentHTML += `
          <div class="col l6 m12 s12 match-list">
            <div class="card-match">
              <div class="save-wrapper">
                <img class="img-black save" src="/src/assets/icons/saved.svg" alt="save" id="${
                  result.id
                }"/>
              </div>
              <p class="home-team">${result.homeTeam.name}</p>
              <p class="versus">v</p>
              <p class="away-team">${result.awayTeam.name}</p>
              <hr />
              <p class="match-date">${day[date.getDay()]}, ${date.getDate()} ${
            month[date.getMonth()]
          } ${date.getFullYear()}</p>
            </div>
          </div>
        `;
        });
      }
      content.innerHTML = contentHTML;
    })
    .then(() => {
      const save = document.querySelectorAll(".save");
      save.forEach((result) => {
        const idMatch = result.id;
        result.addEventListener("click", () => {
          // eslint-disable-next-line no-undef
          M.toast({
            html: "Delete match from saved!",
            displayLength: 1000,
            classes: "rounded",
          });
          result.src = "/src/assets/icons/saved.svg";
          deleteMatch(parseInt(idMatch));
          LoadHomeContent();
        });
      });
    })
    .catch(error);
};

export default Saved;
