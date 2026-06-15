import {
 ChangeDetectionStrategy,
 Component,
 input,
 output,
} from '@angular/core';

@Component({
 selector: 'lib-input',
 templateUrl: './input.html',
 styleUrls: ['./input.scss'],
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
 readonly type = input('text');
 readonly value = input('');
 readonly placeholder = input('');
 readonly disabled = input(false);
 readonly readonly = input(false);
 readonly required = input(false);

 readonly valueChange = output<string>();
 readonly blurEvent = output<FocusEvent>();

 handleInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.valueChange.emit(target.value);
 }

 handleBlur(event: FocusEvent): void {
  this.blurEvent.emit(event);
 }
}