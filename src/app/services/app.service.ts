import { Injectable, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  updateAvailable = signal(false);

  constructor(private updates: SwUpdate) {
    if (!this.updates.isEnabled) return;

    this.updates.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(() => {
        this.updateAvailable.set(true);
      });

    interval(60000).subscribe(() => {
      this.updates.checkForUpdate();
    });
  }

  reload(): void {
    location.reload();
  }
}
