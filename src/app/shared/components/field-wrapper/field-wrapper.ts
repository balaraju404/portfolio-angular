import {
 ChangeDetectionStrategy,
 Component,
 input,
} from '@angular/core';

@Component({
 selector: 'lib-field-wrapper',
 templateUrl: './field-wrapper.html',
 styleUrl: './field-wrapper.scss',
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldWrapper {
 readonly label = input('');
 readonly hint = input('');
 readonly error = input('');
 readonly required = input(false);

 readonly placement = input<'vertical' | 'horizontal'>('vertical');
}