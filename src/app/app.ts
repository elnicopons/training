import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorService } from './services/color.service';
import { SoundService } from './services/sound.service';
import { faBell, faBellSlash, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppService } from './services/app.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap/alert';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FontAwesomeModule, NgbAlert],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  soundOn: boolean;
  faBell = faBell;
  faBellSlash = faBellSlash;
  faCloudArrowDown = faCloudArrowDown;

  constructor(
    private colorService: ColorService,
    private soundService: SoundService,
    public appService: AppService,
  ) {}

  ngOnInit(): void {
    this.soundService.soundOn$.subscribe((soundOn) => {
      this.soundOn = soundOn;
    });
  }

  toggleSound() {
    this.soundService.toggleSound();
  }

  update() {
    this.appService.reload();
  }
}
