import LoadHomeContent from "../Content/Home/index.js";

const Navbar = (nameLeague) => {
  const base_url = window.location.hash.split("?");
  const idLeague = parseInt(base_url[1].substr(3));
  const content = document.querySelector(".navbar");
  const page = base_url[0].substr(1);

  fetch("/src/components/Navbar/Home/index.html")
    .then((res) => res.text())
    .then((res) => {
      content.innerHTML = res;

      if (page === "standing" || page === "match" || page === "result") {
        const navActive = document.querySelectorAll(".nav-tab");
        navActive.forEach((result) => {
          if (result.getAttribute("href").substr(1) === page) {
            result.classList.add("active");
            document.querySelector(".active").style.borderBottom =
              "2px solid white";
            result.style.color = "#fff";
          }
        });
      }

      document.querySelectorAll(".nav-tab").forEach((result) => {
        result.href += `?id=${idLeague}`;
        result.addEventListener("click", () => {
          const sidenav = document.querySelector(".sidenav");
          // eslint-disable-next-line no-undef
          M.Sidenav.getInstance(sidenav).close();
          setTimeout(() => {
            LoadHomeContent();
          }, 1);
        });
      });

      document.querySelectorAll(".sidenav-link").forEach((result) => {
        result.addEventListener("click", () => {
          if (result.innerHTML === "Home") {
            result.href = `#standing?id=${idLeague}`;
            const sidenav = document.querySelector(".sidenav");
            // eslint-disable-next-line no-undef
            M.Sidenav.getInstance(sidenav).close();
            setTimeout(() => {
              LoadHomeContent();
            }, 1);
          } else if (result.innerHTML === "Saved") {
            result.href = `#saved?id=${idLeague}`;
            const sidenav = document.querySelector(".sidenav");
            // eslint-disable-next-line no-undef
            M.Sidenav.getInstance(sidenav).close();
            setTimeout(() => {
              LoadHomeContent();
            }, 1);
          }
        });
      });

      const saved = document.querySelector(".saved");
      saved.href = `#saved?id=${idLeague}`;
      saved.addEventListener("click", () => {
        setTimeout(() => {
          LoadHomeContent();
        }, 1);
      });

      const mobNav = document.querySelector(".mob-nav");
      mobNav.innerHTML = `
        <div class="col s12 m6">
          <div class="card">
            <div class="card-image img-sidenav">
              <img src="/src/assets/img/${nameLeague}.jpg" alt="League" />
            </div>
          </div>
          <p class="card-title"><b>${nameLeague}</b></p>
        </div>
      `;

      const brand = document.querySelector(".brand-logo");
      brand.innerHTML = nameLeague;

      const elems = document.querySelectorAll(".sidenav");
      // eslint-disable-next-line no-undef
      M.Sidenav.init(elems);
    });
};

export default Navbar;
