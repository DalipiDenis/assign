import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { resetDatabase } from './app/reset-database';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
