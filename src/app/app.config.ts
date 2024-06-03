import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ActivateService } from './core/services/activate.service';
import { ActivateGuard } from './core/services/activate.guard.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ActivateService, ActivateGuard],
};
