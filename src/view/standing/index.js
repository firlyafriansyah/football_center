import LoadHomeContent from "../../components/Content/Home/index.js";
import { getStanding } from "../../data/api/index.js";

const Standing = () => {
  const base_url = window.location.hash.split("?");
  const idLeague = parseInt(base_url[1].substr(3));

  getStanding(idLeague)
    .then((res) => {
      const content = document.querySelector(".table");
      content.innerHTML = `
        <table class="striped">
          <thead>
            <tr>
              <th class="center">POS</th>
              <th colspan="2" class="center">CLUB</th>
              <th class="center">PG</th>
              <th class="center">W</th>
              <th class="center">L</th>
              <th class="center">D</th>
              <th class="center">GF</th>
              <th class="center">GA</th>
              <th class="center">GD</th>
              <th class="center">POIN</th>
            </tr>
          </thead>
          <tbody class="standing-table">
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="desc">
          <div class="desc-group">
            <div class="ucl blue darken-4"></div>
            <div class="desc-name">UEFA Champions League Group Stage</div>
          </div>
          <div class="desc-group">
            <div class="uefa orange darken-4"></div>
            <div class="desc-name">UEFA Europa League Group Stage</div>
          </div>
          <div class="desc-group">
            <div class="deg red darken-4"></div>
            <div class="desc-name">Degradation</div>
          </div>
        </div>
      `;
      return res.table;
    })
    .then((res) => {
      const content = document.querySelector(".standing-table");
      let contentHTML = "";
      let degradation = [];
      res.forEach((result) => {
        degradation.push(result.position);
      });
      res.forEach((result) => {
        let qualification;
        let imgUrl = result.team.crestUrl;
        imgUrl = imgUrl.replace(/^http:\/\//i, "https://");
        if (result.position <= 4) {
          qualification = "#0d47a1";
        } else if (result.position === 5) {
          qualification = "#e65100";
        } else if (result.position >= degradation.length - 2) {
          qualification = "#b71c1c";
        }
        contentHTML += `
          <tr>
            <td class="center" style="border-left: 4px solid ${qualification}">${result.position}</td>
            <td class="center">
              <a href="#teamDetail?id=${idLeague}&${result.team.id}" class="team" id="${result.team.id}">
                <img src="${imgUrl}"  class="club-logo" alt="Team" />
              </a>
            </td>
            <td>
              <a href="#teamDetail?id=${idLeague}&${result.team.id}" class="team center" id="${result.team.id}">${result.team.name}</a>
            </td>
            <td class="center">${result.playedGames}</td>
            <td class="center">${result.won}</td>
            <td class="center">${result.lost}</td>
            <td class="center">${result.draw}</td>
            <td class="center">${result.goalsFor}</td>
            <td class="center">${result.goalsAgainst}</td>
            <td class="center">${result.goalDifference}</td>
            <td class="center"><b>${result.points}</b></td>
          </tr>
        `;
      });
      content.innerHTML = contentHTML;
      document.querySelectorAll(".team").forEach((result) => {
        result.addEventListener("click", () => {
          setTimeout(() => {
            LoadHomeContent();
          }, 1);
        });
      });
    })
    .catch((err) => err);
};

export default Standing;
