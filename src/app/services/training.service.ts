import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StatesEnum } from '../constants/states.enum';

const COUNTDOWN = 3;

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private sets: number;
  private intervals: number;
  private rests: number;
  private countDownInterval: number;
  private trainingInterval: number;
  private restingInterval: number;
  remainingSets$ = new BehaviorSubject(0);
  currentSet$ = new BehaviorSubject(0);
  remainingTrainingTime$ = new BehaviorSubject(0);
  remainingRestingTime$ = new BehaviorSubject(0);
  countdown$ = new BehaviorSubject(COUNTDOWN);
  state$ = new BehaviorSubject<StatesEnum>(StatesEnum.ready);

  private setTraining(sets: number, intervals: number, rests: number) {
    this.sets = sets;
    this.intervals = intervals;
    this.rests = rests;
  }

  private train() {
    this.state$.next(StatesEnum.training);
    this.currentSet$.next(this.currentSet$.value + 1);
    this.remainingSets$.next(--this.sets);
    this.remainingTrainingTime$.next(this.intervals);
    this.trainingInterval = setInterval(() => {
      this.remainingTrainingTime$.next(this.remainingTrainingTime$.value - 1);
      if (this.remainingTrainingTime$.value === 0) {
        clearInterval(this.trainingInterval);
        if (this.remainingSets$.value > 0) {
          this.state$.next(StatesEnum.resting);
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

    this.state$.next(StatesEnum.countdown);
    this.countDownInterval = setInterval(() => {
      this.countdown$.next(this.countdown$.value - 1);
      if (this.countdown$.value === 0) {
        clearInterval(this.countDownInterval);
        this.train();
      }
    }, 1000);
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

    this.state$.next(StatesEnum.ready);
  }

  get isTrainingSet(): boolean {
    return !!(this.sets && this.intervals && this.rests);
  }
}
