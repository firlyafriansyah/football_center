const savedNotification = (homeTeam, awayTeam) => {
  const title = "Pertandingan telah disimpan!";
  const options = {
    body: `Pertandingan ${homeTeam} VS ${awayTeam} berhasil disimpan`,
    icon: "/src/assets/icons/icon_128.png",
    tag: "notif-1",
    badge: "/src/assets/icons/badge.png",
  };

  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options);
    });
  } else {
    console.log("Notofikasi tidak di ijinkan");
  }
};

export { savedNotification };
