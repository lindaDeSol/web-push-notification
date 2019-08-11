const check = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};
const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("service.js");
  return swRegistration;
};
const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body
    // here you can add more properties like icon, image, vibrate, etc.
  };
  /* Possible values of Notification Option:
  https://developer.mozilla.org/en-US/docs/Web/API/notification?source=post_page

  const options = {
  "//": "Visual Options",
  "body": "<String>",
  "icon": "<URL String>",
  "image": "<URL String>",
  "badge": "<URL String>",
  "vibrate": "<Array of Integers>",
  "sound": "<URL String>",
  "dir": "<String of 'auto' | 'ltr' | 'rtl'>",
  "//": "Behavioural Options",
  "tag": "<String>",
  "data": "<Anything>",
  "requireInteraction": "<boolean>",
  "renotify": "<Boolean>",
  "silent": "<Boolean>",
  "//": "Both Visual & Behavioural Options",
  "actions": "<Array of Strings>",
  "//": "Information Option. No visual affect.",
  "timestamp": "<Long>"
}
  */
  swRegistration.showNotification(title, options);
};

const main = async () => {
  console.log(Notification.permission);

  check();
  const swRegistration = await registerServiceWorker();
  const permission = await requestNotificationPermission();
  //showLocalNotification("This is title", "this is the message", swRegistration);
};

// main(); we will not call main in the beginning.
