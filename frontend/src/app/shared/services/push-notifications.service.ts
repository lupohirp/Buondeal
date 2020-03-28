import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor() { }

  displayNotification(body) {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        var options = {
          body: body,
          icon: '../../assets/icons/icon-72x72.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Buondeal', options);
      });
    }
  }
}
