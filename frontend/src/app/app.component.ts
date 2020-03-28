import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';
import { PushNotificationsService } from './shared/services/push-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  loading = false;
  deferredPrompt: any;
  public settings: Settings;
  constructor(public appSettings: AppSettings, public router: Router, private _pushNotificationService: PushNotificationsService) {
    this.settings = this.appSettings.settings;
  }

  @HostListener('window:appinstalled', ['$event'])
  onAppInstalles(e) {
    console.log("installed");
    this._pushNotificationService.displayNotification("Ciao");
  }


  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
    });
  }


  public hideComponents() {
    return (this.router.url === '/sign-in' || this.router.url === '/register');
  }
}
