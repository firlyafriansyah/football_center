import Match from "../../../view/match/index.js";
import Saved from "../../../view/saved/index.js";
import ScheduleTeam from "../../../view/scheduleteam/index.js";
import Standing from "../../../view/standing/index.js";
import TeamDetail from "../../../view/teamdetail/index.js";
import Navbar from "../../Navbar/index.js";
import { error, nameLeague } from "../../../data/index.js";

const LoadHomeContent = () => {
  const content = document.querySelector("#body-content");
  let base_url = window.location.hash.split("?");
  const idLeague = parseInt(base_url[1].substr(3));
  const league = nameLeague(idLeague);
  const page = base_url[0].substr(1);

  fetch(`/src/pages/Home/${page}/index.html`)
    .then((res) => res.text())
    .then((res) => {
      Navbar(league);
      content.innerHTML = res;
      switch (page) {
        case "standing":
          Standing();
          break;
        case "teamDetail":
          TeamDetail();
          break;
        case "match":
          Match(page);
          break;
        case "result":
          Match(page);
          break;
        case "teamSchedule":
          ScheduleTeam();
          break;
        case "saved":
          Saved();
          break;
        default:
          break;
      }
    })
    .catch(error);
};

export default LoadHomeContent;
