import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { defineCustomElements } from '@teamhive/lottie-player/loader';


if (environment.production) {
  enableProdMode();
}

Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status);
});

defineCustomElements(window);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
