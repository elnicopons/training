import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  remainingSets$: BehaviorSubject<number>;
  currentSet$: BehaviorSubject<number>;
  remainingTrainingTime$: BehaviorSubject<number>;
  remainingRestingTime$: BehaviorSubject<number>;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.remainingSets$ = this.trainingService.remainingSets$;
    this.currentSet$ = this.trainingService.currentSet$;
    this.remainingTrainingTime$ = this.trainingService.remainingTrainingTime$;
    this.remainingRestingTime$ = this.trainingService.remainingRestingTime$;

    this.trainingService.trainingEnd$.subscribe(() => this.router.navigate(['']));
  }

  stopTraining() {
    this.trainingService.stopTraining();
  }
}
