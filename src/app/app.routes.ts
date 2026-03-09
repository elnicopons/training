import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { dashboardGuard } from './services/dashboard.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [dashboardGuard],
  },
];
