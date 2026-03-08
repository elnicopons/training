import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorService } from './services/color.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private colorService: ColorService) {}
}
