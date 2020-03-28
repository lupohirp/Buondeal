import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor() { }

  displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        var options = {
          body: 'Here is a notification body!',
          icon: 'images/example.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Hello world!', options);
      });
    }
  }
}
