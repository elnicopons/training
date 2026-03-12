import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { StatesEnum } from '../constants/states.enum';

const COUNTDOWN = 3;

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private sets: number;
  private intervals: number;
  private rests: number;
  private countDownInterval: Subscription;
  private trainingInterval: Subscription;
  private restingInterval: Subscription;
  remainingSets$ = new BehaviorSubject(0);
  currentSet$ = new BehaviorSubject(0);
  remainingTrainingTime$ = new BehaviorSubject(0);
  remainingRestingTime$ = new BehaviorSubject(0);
  countdown$ = new BehaviorSubject(0);
  state$ = new BehaviorSubject<StatesEnum>(StatesEnum.ready);
  paused$ = new BehaviorSubject(false);

  private setTraining(sets: number, intervals: number, rests: number) {
    this.sets = sets;
    this.intervals = intervals;
    this.rests = rests;
  }

  private train() {
    this.state$.next(StatesEnum.training);

    this.currentSet$.next(this.currentSet$.getValue() + 1);
    this.remainingSets$.next(--this.sets);
    this.remainingTrainingTime$.next(this.intervals);

    this.resumeTraining();
  }

  private startRest() {
    this.state$.next(StatesEnum.resting);
    this.remainingRestingTime$.next(this.rests);
    this.resumeResting();
  }

  private resumeResting() {
    this.restingInterval = interval(1000).subscribe(() => {
      this.remainingRestingTime$.next(this.remainingRestingTime$.getValue() - 1);

      if (this.remainingRestingTime$.getValue() === 0) {
        this.restingInterval.unsubscribe();
        this.train();
      }
    });
  }

  private resumeTraining() {
    this.trainingInterval = interval(1000).subscribe(() => {
      this.remainingTrainingTime$.next(this.remainingTrainingTime$.getValue() - 1);

      if (this.remainingTrainingTime$.getValue() === 0) {
        this.trainingInterval.unsubscribe();

        if (this.remainingSets$.getValue() > 0) {
          this.startRest();
        } else {
          this.stop();
        }
      }
    });
  }

  get isTrainingSet(): boolean {
    return !!(this.sets && this.intervals && this.rests);
  }

  startTraining(sets: number, intervals: number, rests: number) {
    this.setTraining(sets, intervals, rests);

    this.countdown$.next(COUNTDOWN);
    this.state$.next(StatesEnum.countdown);

    this.countDownInterval = interval(1000).subscribe(() => {
      this.countdown$.next(this.countdown$.getValue() - 1);
      if (this.countdown$.getValue() === 0) {
        this.countDownInterval.unsubscribe();
        this.train();
      }
    });
  }

  stop() {
    this.countDownInterval?.unsubscribe();
    this.trainingInterval?.unsubscribe();
    this.restingInterval?.unsubscribe();

    this.remainingSets$.next(0);
    this.currentSet$.next(0);
    this.remainingTrainingTime$.next(0);
    this.remainingRestingTime$.next(0);
    this.countdown$.next(0);
    this.paused$.next(false);

    this.state$.next(StatesEnum.ready);
  }

  pause() {
    this.paused$.next(true);

    this.trainingInterval?.unsubscribe();
    this.restingInterval?.unsubscribe();
  }

  resume() {
    this.paused$.next(false);

    if (this.state$.getValue() === StatesEnum.training) {
      this.resumeTraining();
    }

    if (this.state$.getValue() === StatesEnum.resting) {
      this.resumeResting();
    }
  }
}
