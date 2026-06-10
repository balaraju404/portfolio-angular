import {
 ChangeDetectionStrategy,
 Component,
 input,
 output,
 signal,
} from '@angular/core';

@Component({
 selector: 'lib-password',
 templateUrl: './password.html',
 styleUrl: './password.scss',
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Password {
 readonly value = input('');
 readonly placeholder = input('');
 readonly disabled = input(false);
 readonly readonly = input(false);
 readonly required = input(false);

 readonly valueChange = output<string>();
 readonly blurEvent = output<FocusEvent>();

 readonly showPassword = signal(false);

 handleInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.valueChange.emit(target.value);
 }

 handleBlur(event: FocusEvent): void {
  this.blurEvent.emit(event);
 }

 togglePasswordVisibility(): void {
  this.showPassword.update(value => !value);
 }
}