import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { BehaviorSubject, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TimerPipe } from '../../pipes/timer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { States } from '../../constants/states.enum';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TimerPipe, FontAwesomeModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  remainingSets$: BehaviorSubject<number>;
  currentSet$: BehaviorSubject<number>;
  remainingTrainingTime$: BehaviorSubject<number>;
  remainingRestingTime$: BehaviorSubject<number>;
  countdown$: BehaviorSubject<number>;
  state: string;
  states = States;

  faStop = faStop;
  faPlay = faPlay;
  faPause = faPause;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.countdown$ = this.trainingService.countdown$;
    this.remainingSets$ = this.trainingService.remainingSets$;
    this.currentSet$ = this.trainingService.currentSet$;
    this.remainingTrainingTime$ = this.trainingService.remainingTrainingTime$;
    this.remainingRestingTime$ = this.trainingService.remainingRestingTime$;

    this.trainingService.state$.subscribe((state) => {
      if (state === States.ready) {
        this.router.navigate(['']);
      }

      this.state = state;
    });
  }

  stopTraining() {
    this.trainingService.stopTraining();
  }
}
