import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

const COUNTDOWN = 3;

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private sets: number;
  private intervals: number;
  private rests: number;
  private countDownInterval: number;
  private trainingInterval: number;
  private restingInterval: number;
  remainingSets$: BehaviorSubject<number> = new BehaviorSubject(0);
  currentSet$: BehaviorSubject<number> = new BehaviorSubject(0);
  remainingTrainingTime$: BehaviorSubject<number> = new BehaviorSubject(0);
  remainingRestingTime$: BehaviorSubject<number> = new BehaviorSubject(0);
  countdown$: BehaviorSubject<number> = new BehaviorSubject(COUNTDOWN);
  trainingEnd$: Subject<void> = new Subject();

  private setTraining(sets: number, intervals: number, rests: number) {
    this.sets = sets;
    this.intervals = intervals;
    this.rests = rests;
  }

  private train() {
    this.currentSet$.next(this.currentSet$.value + 1);
    this.remainingSets$.next(--this.sets);
    this.remainingTrainingTime$.next(this.intervals);
    this.trainingInterval = setInterval(() => {
      this.remainingTrainingTime$.next(this.remainingTrainingTime$.value - 1);
      if (this.remainingTrainingTime$.value === 0) {
        clearInterval(this.trainingInterval);
        if (this.remainingSets$.value > 0) {
          this.remainingRestingTime$.next(this.rests);
          this.restingInterval = setInterval(() => {
            this.remainingRestingTime$.next(this.remainingRestingTime$.value - 1);
            if (this.remainingRestingTime$.value === 0) {
              clearInterval(this.restingInterval);
              this.train();
            }
          }, 1000);
        } else {
          this.stopTraining();
        }
      }
    }, 1000);
  }

  startTraining(sets: number, intervals: number, rests: number) {
    this.setTraining(sets, intervals, rests);

    this.train();
  }

  stopTraining() {
    clearInterval(this.countDownInterval);
    clearInterval(this.trainingInterval);
    clearInterval(this.restingInterval);

    this.remainingSets$.next(0);
    this.currentSet$.next(0);
    this.remainingTrainingTime$.next(0);
    this.remainingRestingTime$.next(0);
    this.countdown$.next(COUNTDOWN);

    this.trainingEnd$.next();
  }
}
