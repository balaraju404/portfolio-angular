import {
 ChangeDetectionStrategy,
 Component,
 input,
 output,
} from '@angular/core';

@Component({
 selector: 'lib-button',
 templateUrl: './button.html',
 styleUrl: './button.scss',
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
 readonly type = input<'button' | 'submit' | 'reset'>('button');
 readonly disabled = input(false);
 readonly loading = input(false);

 buttonClock = output<Event>()

 handleButtonEvent(event: Event): void {
  if (this.disabled() || this.loading()) return
  this.buttonClock.emit(event)
 }
}