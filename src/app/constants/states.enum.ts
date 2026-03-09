import { ValueText } from '../models/value-text';

export enum StatesEnum {
  ready = 'ready',
  countdown = 'countdown',
  training = 'training',
  resting = 'resting',
}

export const States: Record<string, ValueText> = {
  [StatesEnum.ready]: { value: 'ready', text: 'Listo' },
  [StatesEnum.countdown]: { value: 'countdown', text: 'Cuenta Regresiva' },
  [StatesEnum.training]: { value: 'training', text: 'Entrenando' },
  [StatesEnum.resting]: { value: 'resting', text: 'Descansando' },
};
