import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorService } from './services/color.service';
import { SoundService } from './services/sound.service';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  soundOn: boolean;
  faBell = faBell;
  faBellSlash = faBellSlash;

  constructor(
    private colorService: ColorService,
    private soundService: SoundService,
  ) {}

  ngOnInit(): void {
    this.soundService.soundOn$.subscribe((soundOn) => {
      this.soundOn = soundOn;
    });
  }

  toggleSound() {
    this.soundService.toggleSound();
  }
}
