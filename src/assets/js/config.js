// Service Worker Registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => navigator.serviceWorker.ready);
} else {
  console.log("Serviceworker tidak di dukung");
}

// Base64 to Uint8
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// Notification Request Permission
const requestPermission = () => {
  Notification.requestPermission();
};
if ("Notification" in window) {
  requestPermission();
} else {
  console.error("Browser tidak mendukung notifikasi.");
}

// Push Notification Configuration
navigator.serviceWorker.ready.then(() => {
  if ("PushManager" in window) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BD24iYiVZx9Bwx-GGPy02rSqj959STgNVlbCHjwBnFynYFQ-0JyFNbI6Jihwra9drwD-cDhURCyN6fEBLTi2yrY"
          ),
        })
        .then((subscribe) => {
          console.log("Endpoint: ", subscribe.endpoint);
          console.log(
            "p256dh key: ",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("p256dh"))
              )
            )
          );
          console.log(
            "Auth key: ",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("auth"))
              )
            )
          );
        })
        .catch((e) => {
          console.error("Subcribe failed! ", e.message);
        });
    });
  }
});
