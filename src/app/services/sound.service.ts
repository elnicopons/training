import { Injectable } from '@angular/core';
import { TrainingService } from './training.service';
import { BehaviorSubject, filter, skip } from 'rxjs';
import { StatesEnum } from '../constants/states.enum';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private ctx = new AudioContext();
  private soundOn: boolean;
  soundOn$: BehaviorSubject<boolean>;

  constructor(private trainingService: TrainingService) {
    this.initiateSound();
    this.setSounds();
  }

  private initiateSound() {
    let sound = JSON.parse(localStorage.getItem('soundOn'));

    if (sound === null) {
      this.soundOn = false;
      this.soundOn$ = new BehaviorSubject(this.soundOn);
      this.toggleSound();
    } else {
      this.soundOn = sound;
      this.soundOn$ = new BehaviorSubject(this.soundOn);
    }
  }

  private setSounds() {
    this.trainingService.countdown$.pipe(filter(Boolean)).subscribe(() => {
      this.countdown();
    });

    this.trainingService.state$.pipe(skip(1)).subscribe((state) => {
      switch (state) {
        case StatesEnum.training:
          this.startSet();
          break;

        case StatesEnum.resting:
          this.endSet();
          break;

        case StatesEnum.ready:
          this.endTraining();
      }
    });
  }

  private beep(duration: number, frequency: number) {
    if (!this.soundOn) {
      return;
    }
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    oscillator.connect(gain);
    gain.connect(this.ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
    }, duration);
  }

  countdown() {
    this.beep(120, 1000);
  }

  startSet() {
    this.beep(120, 1200);
    setTimeout(() => this.beep(120, 1200), 180);
  }

  endSet() {
    this.beep(120, 700);
    setTimeout(() => this.beep(120, 700), 180);
  }

  endTraining() {
    this.beep(300, 700);
    setTimeout(() => {
      this.beep(300, 700);
      setTimeout(() => this.beep(600, 700), 600);
    }, 600);
  }

  toggleSound() {
    this.soundOn = !this.soundOn;
    localStorage.setItem('soundOn', JSON.stringify(this.soundOn));
    this.soundOn$.next(this.soundOn);
  }
}
