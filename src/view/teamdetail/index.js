import LoadHomeContent from "../../components/Content/Home/index.js";
import { getTeamDetail } from "../../data/api/index.js";

const TeamDetail = () => {
  const base_url = window.location.hash.split("?");
  const idTeam = parseInt(base_url[1].substr(8));
  const idLeague = parseInt(base_url[1].substr(3, 4));
  const content = document.querySelector(".team-detail");

  // Fetch data from API Endpoint
  getTeamDetail(idTeam)
    .then((res) => {
      let imgUrl = res.crestUrl;
      imgUrl = imgUrl.replace(/^http:\/\//i, "https://");
      const contentHTML = `
              <div class="row">
                <div class="col l4 s12 detail">
                  <img src="${imgUrl}" width="200" class="logo" alt="logo" />
                  <p class="name">${res.name}</p>
                  <a href="#teamSchedule?id=${idLeague}&${idTeam}" class="waves-effect waves-light btn indigo darken-4">Match Schedule</a>
                  <table>
                    <tr>
                      <td><b>Country</b></td>
                      <td>${res.area.name}</td>
                    </tr>
                    <tr>
                      <td><b>Club Color</b></td>
                      <td>${res.clubColors}</td>
                    </tr>
                    <tr>
                      <td><b>Email</b></td>
                      <td>${res.email}</td>
                    </tr>
                    <tr>
                      <td><b>Founded</b></td>
                      <td>${res.founded}</td>
                    </tr>
                    <tr>
                      <td><b>TLA</b></td>
                      <td>${res.tla}</td>
                    </tr>
                    <tr>
                      <td><b>Venue</b></td>
                      <td>${res.venue}</td>
                    </tr>
                    <tr>
                      <td><b>Address</b></td>
                      <td>${res.address}</td>
                    </tr>
                    <tr>
                      <td><b>Website</b></td>
                      <td>
                        <a href="${res.website}" target="_blank">${res.website}</a>
                      </td>
                    </tr>
                  </table>
                  </div>
                  <div class="col l1"></div>
                  <div class="col l7 s12">
                  <div class="row">
                    <table class="striped highlight" >
                      <thead>
                        <tr>
                          <th class="player-center">NO</th>
                          <th >NAME</th>
                          <th class="player-center">POSITION</th>
                        </tr>
                      <thead>
                      <tbody class="player"></tbody>
                    </table>
                  </div>
                </div>
              </div>
            `;
      content.innerHTML = contentHTML;
      return res.squad;
    })
    .then((res) => {
      const playerHTML = document.querySelector(".player");
      let contentHTML = "";
      let number = 1;
      res.forEach((result) => {
        contentHTML += `
                <tr>
                  <td class="player-center">${number}</td>
                  <td><b>${result.name}</b></td>
                  <td class="player-center">${result.position}</td>
                </tr>
              `;
        playerHTML.innerHTML = contentHTML;
        number++;
      });

      const matchSchedule = document.querySelector(".btn");
      matchSchedule.addEventListener("click", () => {
        setTimeout(() => {
          LoadHomeContent();
        }, 1);
      });
    })
    .catch((err) => err);
};

export default TeamDetail;
