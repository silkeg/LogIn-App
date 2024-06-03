import { Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { ActivateGuard } from './core/services/activate.guard.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    canActivate: mapToCanActivate([ActivateGuard]),
    component: UserComponent,
  },
];
