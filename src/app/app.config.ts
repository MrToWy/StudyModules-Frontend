import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule), provideHttpClient(), provideTransloco({
        config: {
          availableLangs: ['de', 'en'],
          defaultLang: 'de',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
  ],
};
