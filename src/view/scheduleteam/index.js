import { day, month } from "../../data/index.js";
import LoadHomeContent from "../../components/Content/Home/index.js";
import { allMatch, saveMatch, deleteMatch } from "../../data/db/db.js";
import { savedNotification } from "../../data/notification/index.js";
import { getMatch } from "../../data/api/index.js";

const ScheduleTeam = () => {
  const base_url = window.location.hash.split("?");
  const idTeam = parseInt(base_url[1].substr(8));
  const idLeague = parseInt(base_url[1].substr(3, 4));
  const content = document.querySelector(".team-schedule");
  let matchdayResult = [];
  let matchdaySchedule = [];
  let contentHTML = "";

  // Fetch data with API endpoint
  getMatch(idLeague)
    .then((res) => {
      // Spliting Data Finished or Scheduled Match
      res.forEach((result) => {
        if (result.status === "FINISHED") {
          matchdayResult.push(result.matchday);
          matchdayResult = Array.from(new Set(matchdayResult));
        } else if (result.status === "SCHEDULED") {
          matchdaySchedule.push(result.matchday);
          matchdaySchedule = Array.from(new Set(matchdaySchedule));
        }
      });
      // Show All Matchsay Data When Load Content
      matchdayResult.forEach((result) => {
        contentHTML += `
                  <div class="match-wrapper">
                    <p class="matches">Pertandingan Ke-${result}</p>
                    <hr />
                    <div class="schedule row" id=${result}></div>
                  </div>
                `;
        content.innerHTML = contentHTML;
      });
      matchdaySchedule.forEach((result) => {
        contentHTML += `
                  <div class="match-wrapper">
                    <p class="matches">Pertandingan Ke-${result}</p>
                    <hr />
                    <div class="schedule row" id=${result}></div>
                  </div>
                `;
        content.innerHTML = contentHTML;
      });
      // Button Conditional for load matchday
      document.querySelectorAll(".btn").forEach((result) => {
        result.addEventListener("click", (event) => {
          contentHTML = "";
          const btn = event.target.getAttribute("href").substr(1);
          if (btn === "result") {
            matchdayResult.reverse();
            matchdayResult.forEach((result) => {
              contentHTML += `
                        <div class="match-wrapper">
                          <p class="matches">Pertandingan Ke-${result}</p>
                          <hr />
                          <div class="schedule row" id=${result}></div>
                        </div>
                      `;
              content.innerHTML = contentHTML;
            });
          } else if (btn === "schedule") {
            matchdaySchedule.forEach((result) => {
              contentHTML += `
                        <div class="match-wrapper">
                          <p class="matches">Pertandingan Ke-${result}</p>
                          <hr />
                          <div class="schedule row" id=${result}></div>
                        </div>
                      `;
              content.innerHTML = contentHTML;
            });
          }
        });
      });
      return res;
    })
    .then((res) => {
      // Show All Match Data When Load Content Match Schedule
      res.forEach((result) => {
        const date = new Date(`${result.utcDate}`);
        let color;
        if (result.homeTeam.id === idTeam || result.awayTeam.id === idTeam) {
          if (result.homeTeam.id === idTeam) {
            if (result.score.winner === "HOME_TEAM") {
              color = "background-color:#388e3c";
            } else if (result.score.winner === "AWAY_TEAM") {
              color = "background-color:#d32f2f";
            } else if (result.score.winner === "DRAW") {
              color = "background-color:#455a64";
            }
          } else if (result.awayTeam.id === idTeam) {
            if (result.score.winner === "HOME_TEAM") {
              color = "background-color:#d32f2f";
            } else if (result.score.winner === "AWAY_TEAM") {
              color = "background-color:#388e3c";
            } else if (result.score.winner === "DRAW") {
              color = "background-color:#455a64";
            }
          }
          let contentSch = "";
          const schedule = document.getElementById(
            `${parseInt(result.matchday)}`
          );
          contentSch += `
                    <div class="col l12 m12 s12 match-list">
                      <div class="card-match result" style=${color}>
                        ${
                          result.status === "SCHEDULED" ||
                          result.status === "POSTPONED"
                            ? `<div class="save-wrapper">
                        <img class="img-black save" src="/src/assets/icons/save.svg" alt="save" id="${result.id}"/>
                      </div>`
                            : ""
                        }
                        <table style="border: none">
                          <tr class="home">
                            <td class="home-team home">${
                              result.homeTeam.name
                            }</td>
                            <td class="versus home">${
                              result.score.fullTime.homeTeam === null
                                ? ""
                                : result.score.fullTime.homeTeam
                            }</td>
                            <td></td>
                          </tr>
                          <tr class="home">
                            <td class="versus">v</td>
                            <td class="versus" style=${
                              result.score.fullTime.homeTeam === null
                                ? "display:none"
                                : "display:inline"
                            }>-</td>
                            <td></td>
                          </tr>
                          <tr class="home">
                            <td class="away-team away">${
                              result.awayTeam.name
                            }</td>
                            <td class="versus away">${
                              result.score.fullTime.awayTeam === null
                                ? ""
                                : result.score.fullTime.awayTeam
                            }</td>
                            <td></td>
                          </tr>
                          <tr class="home">
                            <td class="match-date"><hr />${
                              day[date.getDay()]
                            }, ${date.getDate()} ${
            month[date.getMonth()]
          } ${date.getFullYear()}</td>
                          </tr>
                        </table>
                      </div>
                    </div>`;
          schedule.innerHTML = contentSch;
        }
      });

      // Button Conditional In Schedule Match Team
      document.querySelectorAll(".btn").forEach((result) => {
        result.addEventListener("click", (event) => {
          const btn = event.target.getAttribute("href").substr(1);
          if (btn === "result") {
            res.forEach((result) => {
              let color;
              const date = new Date(`${result.utcDate}`);
              if (result.status === "FINISHED") {
                if (
                  result.homeTeam.id === idTeam ||
                  result.awayTeam.id === idTeam
                ) {
                  if (result.homeTeam.id === idTeam) {
                    if (result.score.winner === "HOME_TEAM") {
                      color = "background-color:#388e3c";
                    } else if (result.score.winner === "AWAY_TEAM") {
                      color = "background-color:#d32f2f";
                    } else if (result.score.winner === "DRAW") {
                      color = "background-color:#455a64";
                    }
                  } else if (result.awayTeam.id === idTeam) {
                    if (result.score.winner === "HOME_TEAM") {
                      color = "background-color:#d32f2f";
                    } else if (result.score.winner === "AWAY_TEAM") {
                      color = "background-color:#388e3c";
                    } else if (result.score.winner === "DRAW") {
                      color = "background-color:#455a64";
                    }
                  }
                  let contentSch = "";
                  const schedule = document.getElementById(
                    `${parseInt(result.matchday)}`
                  );
                  contentSch += `
                            <div class="col l12 m12 s12 match-list">
                              <div class="card-match result" style=${color}>
                                <table style="border: none">
                                  <tr class="home">
                                    <td class="home-team home">${
                                      result.homeTeam.name
                                    }</td>
                                    <td class="versus home">${
                                      result.score.fullTime.homeTeam
                                    }</td>
                                    <td></td>
                                  </tr>
                                  <tr class="home">
                                    <td class="versus">v</td>
                                    <td class="versus">-</td>
                                    <td></td>
                                  </tr>
                                  <tr class="home">
                                    <td class="away-team away">${
                                      result.awayTeam.name
                                    }</td>
                                    <td class="versus away">${
                                      result.score.fullTime.awayTeam
                                    }</td>
                                    <td></td>
                                  </tr>
                                  <tr class="home">
                                    <td class="match-date"><hr />${
                                      day[date.getDay()]
                                    }, ${date.getDate()} ${
                    month[date.getMonth()]
                  } ${date.getFullYear()}</td>
                                  </tr>
                                </table>
                              </div>
                            </div>`;
                  schedule.innerHTML = contentSch;
                }
              }
            });
          } else if (btn === "schedule") {
            res.forEach((result) => {
              const date = new Date(`${result.utcDate}`);
              if (result.status === "SCHEDULED") {
                if (
                  result.homeTeam.id === idTeam ||
                  result.awayTeam.id === idTeam
                ) {
                  let contentSch = "";
                  const schedule = document.getElementById(
                    `${parseInt(result.matchday)}`
                  );
                  contentSch += `
                            <div class="col l12 m12 s12 match-list">
                              <div class="card-match result">
                                <div class="save-wrapper">
                                  <img class="img-black save" src="/src/assets/icons/save.svg" alt="save" id="${
                                    result.id
                                  }"/>
                                </div>
                                <table style="border: none">
                                  <tr class="home">
                                    <td class="home-team home">${
                                      result.homeTeam.name
                                    }</td>
                                  </tr>
                                  <tr class="home">
                                    <td class="versus">v</td>
                                  </tr>
                                  <tr class="home">
                                    <td class="away-team away">${
                                      result.awayTeam.name
                                    }</td>
                                  </tr>
                                  <tr class="home">
                                    <td class="match-date"><hr />${
                                      day[date.getDay()]
                                    }, ${date.getDate()} ${
                    month[date.getMonth()]
                  } ${date.getFullYear()}</td>
                                  </tr>
                                </table>
                              </div>
                            </div>`;
                  schedule.innerHTML = contentSch;
                }
              }
            });
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
                      savedNotification(
                        result.homeTeam.name,
                        result.awayTeam.name
                      );
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
          } else if (btn === "teamdetail") {
            result.href = `#teamDetail?id=${idLeague}&${idTeam}`;
            setTimeout(() => {
              LoadHomeContent();
            }, 1);
          }
        });
      });
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

export default ScheduleTeam;
