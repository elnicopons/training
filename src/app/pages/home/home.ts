import { Component, OnInit } from '@angular/core';
import { intervals, rests, sets } from '../../constants/sessions';
import { TrainingService } from '../../services/training.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  sets = sets;
  intervals = intervals;
  rests = rests;
  form: FormGroup;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      set: [sets[0]],
      interval: [intervals[0]],
      rest: [rests[0]],
    });
  }

  startTraining() {
    this.trainingService.startTraining(
      this.form.controls['set'].value.value,
      this.form.controls['interval'].value.value,
      this.form.controls['rest'].value.value,
    );
    this.router.navigate(['dashboard']);
  }
}
