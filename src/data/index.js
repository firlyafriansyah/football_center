const root_url = "https://api.football-data.org/v2/competitions/";
const headers = {
  headers: new Headers({ "X-Auth-Token": "30f4b2525be7467499f6feb87a503136" }),
};
const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const nameLeague = (idLeague) => {
  switch (idLeague) {
    case 2021:
      return "Premier League";
    case 2015:
      return "Ligue 1";
    case 2002:
      return "Bundesliga";
    case 2019:
      return "Serie A";
    case 2003:
      return "Eredivisie";
    case 2017:
      return "Primeira Liga";
    default:
      return "Football Center";
  }
};

const error = () => {
  const contentHTML = `
    <div class="errorServer">
     <img src="/src/assets/illustrations/errorServer.svg" class="error-img" alt="Error"/>
     <p class="error-title">Sorry... We can't loaded a page.</p>
     <p class="error-desc">Maybe, something went wrong.</p>
     <p class="error-desc">Please, check your connection!</p>
    </div>
    `;
  document.querySelector(".content").innerHTML = contentHTML;
  document.querySelector(".row").innerHTML = contentHTML;
};

export { headers, day, month, nameLeague, error, root_url };
