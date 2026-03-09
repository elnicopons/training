import { DOCUMENT, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TrainingService } from './training.service';
import { StatesEnum } from '../constants/states.enum';

@Injectable({ providedIn: 'root' })
export class ColorService {
  private renderer: Renderer2;

  constructor(
    private trainingService: TrainingService,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.trainingService.state$.subscribe((state) => {
      Object.values(StatesEnum).forEach((state) =>
        this.renderer.removeClass(this.document.body, state),
      );
      this.renderer.addClass(this.document.body, state);
    });
  }
}
