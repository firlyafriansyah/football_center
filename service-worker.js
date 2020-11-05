/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js"
);

if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: "Football-Center",
  });

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  workbox.precaching.precacheAndRoute([
    { url: "/index.html", revision: "1" },
    { url: "/index.js", revision: "1" },
    { url: "/service-worker.js", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/src/assets/css/style.css", revision: "1" },
    { url: "/src/assets/icons/ball.svg", revision: "1" },
    { url: "/src/assets/icons/save.svg", revision: "1" },
    { url: "/src/assets/icons/saved.svg", revision: "1" },
    { url: "/src/assets/icons/icon_16.png", revision: "1" },
    { url: "/src/assets/icons/icon_128.png", revision: "1" },
    { url: "/src/assets/icons/icon_256.png", revision: "1" },
    { url: "/src/assets/icons/icon_512.png", revision: "1" },
    { url: "/src/assets/illustrations/errorServer.svg", revision: "1" },
    { url: "/src/assets/illustrations/loaderImg.svg", revision: "1" },
    { url: "/src/assets/img/Bundesliga.jpg", revision: "1" },
    { url: "/src/assets/img/Eredivisie.jpg", revision: "1" },
    { url: "/src/assets/img/Ligue 1.jpg", revision: "1" },
    { url: "/src/assets/img/Premier League.jpg", revision: "1" },
    { url: "/src/assets/img/Primeira Liga.jpg", revision: "1" },
    { url: "/src/assets/img/Serie A.jpg", revision: "1" },
    { url: "/src/assets/img/nav-bg.jpg", revision: "1" },
    { url: "/src/assets/js/idb.js", revision: "1" },
    { url: "/src/assets/js/push.js", revision: "1" },
    { url: "/src/assets/js/config.js", revision: "1" },
    { url: "/src/assets/materialize/css/materialize.min.css", revision: "1" },
    { url: "/src/assets/materialize/js/materialize.min.js", revision: "1" },
    { url: "/src/components/Content/Home/index.js", revision: "1" },
    { url: "/src/components/Content/Welcome/index.js", revision: "1" },
    { url: "/src/components/Footer/index.js", revision: "1" },
    { url: "/src/components/Navbar/Home/index.html", revision: "1" },
    { url: "/src/components/Navbar/index.js", revision: "1" },
    { url: "/src/data/index.js", revision: "1" },
    { url: "/src/data/api/index.js", revision: "1" },
    { url: "/src/data/db/db.js", revision: "1" },
    { url: "/src/data/notification/index.js", revision: "1" },
    { url: "/src/pages/Footer/index.html", revision: "1" },
    { url: "/src/pages/Home/match/index.html", revision: "1" },
    { url: "/src/pages/Home/result/index.html", revision: "1" },
    { url: "/src/pages/Home/saved/index.html", revision: "1" },
    { url: "/src/pages/Home/standing/index.html", revision: "1" },
    { url: "/src/pages/Home/teamDetail/index.html", revision: "1" },
    { url: "/src/pages/Home/teamSchedule/index.html", revision: "1" },
    { url: "/src/pages/Welcome/index.html", revision: "1" },
    { url: "/src/view/match/index.js", revision: "1" },
    { url: "/src/view/saved/index.js", revision: "1" },
    { url: "/src/view/scheduleteam/index.js", revision: "1" },
    { url: "/src/view/standing/index.js", revision: "1" },
    { url: "/src/view/teamdetail/index.js", revision: "1" },
    { url: "/src/view/Welcome/index.js", revision: "1" },
  ]);

  workbox.routing.registerRoute(
    ({ url }) => url.origin === "https://api.football-data.org",
    new workbox.strategies.CacheFirst({
      cacheName: "api-data",
    })
  );
} else {
  console.log("Workbox Failed");
}

self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  let options = {
    body: body,
    icon: "/src/assets/icons/icon_128.png",
    vibrate: [100, 50, 100],
    data: {
      dataOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
