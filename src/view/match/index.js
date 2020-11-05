import { day, month } from "../../data/index.js";
import { saveMatch, deleteMatch, allMatch } from "../../data/db/db.js";
import { savedNotification } from "../../data/notification/index.js";
import { getMatch } from "../../data/api/index.js";

const Match = (page) => {
  const base_url = window.location.hash.split("?");
  const idLeague = parseInt(base_url[1].substr(3));
  const content = document.querySelector(".match");
  let matchdayMatch = [];
  let matchdayResult = [];

  // fetch to endpoint
  getMatch(idLeague)
    .then((res) => {
      let contentHTML = "";
      res.forEach((result) => {
        if (result.status === "SCHEDULED") {
          matchdayMatch.push(result.matchday);
          matchdayMatch = Array.from(new Set(matchdayMatch));
        } else if (result.status === "FINISHED") {
          matchdayResult.push(result.matchday);
          matchdayResult = Array.from(new Set(matchdayResult));
        }
      });
      // Loaded matchday data
      if (page === "match") {
        matchdayMatch.forEach((result) => {
          contentHTML += `
                    <div class="match-wrapper">
                      <p class="matches">Pertandingan Ke-${result}</p>
                      <hr />
                      <div class="schedule row" id=${result}></div>
                    </div>
                  `;
        });
        content.innerHTML = contentHTML;
        return res;
      } else if (page === "result") {
        matchdayResult.reverse();
        matchdayResult.forEach((result) => {
          contentHTML += `
                    <div class="match-wrapper">
                      <p class="matches">Pertandingan Ke-${result}</p>
                      <hr />
                      <div class="schedule row" id=${result}></div>
                    </div>
                  `;
        });
        content.innerHTML = contentHTML;
        return res;
      }
    })
    .then((res) => {
      if (page === "match") {
        res.forEach((result) => {
          // Get data schedule match
          if (result.status === "SCHEDULED") {
            const date = new Date(`${result.utcDate}`);
            const schedule = document.getElementById(
              `${parseInt(result.matchday)}`
            );
            schedule.innerHTML += `
                      <div class="col l6 m12 s12 match-list">
                        <div class="card-match">
                          <div class="save-wrapper">
                            <img class="img-black save" src="/src/assets/icons/save.svg" alt="save" id="${
                              result.id
                            }"/>
                          </div>
                          <p class="home-team">${result.homeTeam.name}</p>
                          <p class="versus">v</p>
                          <p class="away-team">${result.awayTeam.name}</p>
                          <hr />
                          <p class="match-date">${
                            day[date.getDay()]
                          }, ${date.getDate()} ${
              month[date.getMonth()]
            } ${date.getFullYear()}</p>
                        </div>
                      </div>
                    `;
          }
        });
      } else if (page === "result") {
        // Get data result match
        res.forEach((result) => {
          if (result.status === "FINISHED") {
            const date = new Date(`${result.utcDate}`);
            const winner = (team) => {
              if (
                result.score.winner === team ||
                result.score.winner === "DRAW"
              ) {
                return "#ffffff";
              } else {
                return "#7d7d7d";
              }
            };
            const schedule = document.getElementById(
              `${parseInt(result.matchday)}`
            );
            schedule.innerHTML += `
                      <div class="col l6 m12 s12 match-list"">
                        <div class="card-match result">
                          <table style="border: none">
                            <tr class="home">
                              <td class="home-team home" style="color:${winner(
                                "HOME_TEAM"
                              )}">${result.homeTeam.name}</td>
                              <td class="versus home" style="color:${winner(
                                "HOME_TEAM"
                              )}">${result.score.fullTime.homeTeam}</td>
                              <td></td>
                              </tr>
                              <tr class="home">
                              <td class="versus">v</td>
                              <td class="versus">-</td>
                              <td></td>
                              </tr>
                              <tr class="home">
                              <td class="away-team away" style="color:${winner(
                                "AWAY_TEAM"
                              )}">${result.awayTeam.name}</td>
                              <td class="versus away" style="color:${winner(
                                "AWAY_TEAM"
                              )}">${result.score.fullTime.awayTeam}</td>
                              <td></td>
                            </tr>
                            <tr class="home">
                              <td colspan="3" class="match-date"><hr />${
                                day[date.getDay()]
                              }, ${date.getDate()} ${
              month[date.getMonth()]
            } ${date.getFullYear()}</td>
                            </tr>
                        </div>
                      </div>
                      `;
          }
        });
      }
      return res;
    })
    .then((res) => {
      // Get saved match data
      const save = document.querySelectorAll(".save");
      save.forEach((result) => {
        allMatch().then((matches) => {
          matches.forEach((match) => {
            if (match.id === result.id) {
              result.src = "/src/assets/icons/saved.svg";
            } else {
              result.src;
            }
          });
        });
        result.addEventListener("click", (event) => {
          const idMatch = event.target.getAttribute("id");
          if (result.src.split("/").includes("save.svg")) {
            // eslint-disable-next-line no-undef
            M.toast({
              html: "Saved match!",
              displayLength: 1000,
              classes: "rounded",
            });
            result.src = "/src/assets/icons/saved.svg";
            res.forEach((result) => {
              if (result.id === parseInt(idMatch)) {
                savedNotification(result.homeTeam.name, result.awayTeam.name);
                saveMatch(result);
              }
            });
          } else if (result.src.split("/").includes("saved.svg")) {
            // eslint-disable-next-line no-undef
            M.toast({
              html: "Delete match from saved!",
              displayLength: 1000,
              classes: "rounded",
            });
            result.src = "/src/assets/icons/save.svg";
            deleteMatch(parseInt(idMatch));
          }
        });
      });
    })
    .catch((err) => err);
};

export default Match;
