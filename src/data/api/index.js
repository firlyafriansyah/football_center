import { error, headers, root_url } from "../index.js";
const urlTeams = "https://api.football-data.org/v2/teams/";

const getWelcomeData = () => {
  const promise = new Promise((resolve, reject) => {
    fetch(root_url, headers)
      .then((res) => resolve(res.json()))
      .catch(() => reject(error()));
  });
  return promise;
};

const getStanding = (idLeague) => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${root_url}${idLeague}/standings`, headers)
      .then((res) => res.json())
      .then((res) => resolve(res.standings[0]))
      .catch(() => reject(error()));
  });
  return promise;
};

const getTeamDetail = (idTeam) => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${urlTeams}${idTeam}`, headers)
      .then((res) => resolve(res.json()))
      .catch(() => reject(error()));
  });
  return promise;
};

const getMatch = (idLeague) => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${root_url}${idLeague}/matches?`, headers)
      .then((res) => res.json())
      .then((res) => resolve(res.matches))
      .catch(() => reject(error()));
  });
  return promise;
};

export { getWelcomeData, getStanding, getTeamDetail, getMatch };
