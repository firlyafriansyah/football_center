import webPush from "web-push";

const vapidKeys = {
  publicKey:
    "BD24iYiVZx9Bwx-GGPy02rSqj959STgNVlbCHjwBnFynYFQ-0JyFNbI6Jihwra9drwD-cDhURCyN6fEBLTi2yrY",
  privateKey: "Wm34PvfQaA1ApctBy320Itwk8mnKDy3YLnfR8bP6UMs",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
let pushSubscription = {
  endpoint:
    "https://sg2p.notify.windows.com/w/?token=BQYAAADjbw3hRLktFBhgzbsoq6q1QvoeLdyNL%2fX9dlOrmQ2nnOEHSpVgar47ZhRhcHO9h8JsKuefQSHS8cV%2fPdkeW%2bU72CbvIayun3swhdaNZEUjXDqE489QfrAl1woGa5cJfbX5NXD%2bt4YRTmzWDMwRTD54NRZBy6t3dhRdEVcCGkf911tYC%2f7zJ7GkNpRzAO3xXxERvmGFBXXFDxq2Q%2beC7xhQd8UWlMS4Tikv%2f%2bZKVCFPx0k%2fqeRmda5aTBOl4CZYw7Me3Vv0mS9W%2bDIzWbtswDH7MDHHkulX6fezlM3d9eXo5%2br%2fgRaDzI1UlFGUtD7YclE%3d",
  keys: {
    p256dh:
      "BNwKsFGNCLCB2G6QvuIgAr0Pgg8SYcUt6TjpOX6SsruqFsInn3TWjWwyioTjBhoW5R+WQ7et6hDrW4noZzi4PXo=",
    auth: "4Rkol4+xrkzhZ7uICCoZ8Q==",
  },
};
let payload =
  "Congratulation! Now, your application can receive Push Notification!";

let options = {
  gcmAPIKey: "1011802865832",
  TTL: 60,
};
webPush
  .sendNotification(pushSubscription, payload, options)
  .catch((err) => console.log(err));
