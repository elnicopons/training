import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TrainingService } from './training.service';

export const dashboardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean | UrlTree | Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const trainingService = inject(TrainingService);
  return trainingService.isTrainingSet ? true : router.createUrlTree(['']);
};
