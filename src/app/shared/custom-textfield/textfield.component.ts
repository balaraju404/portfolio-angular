import { CommonModule } from "@angular/common"
import { Component, EventEmitter, Input, Output } from "@angular/core"
import { FormsModule } from "@angular/forms"

@Component({
 selector: "lib-textfield",
 imports: [CommonModule, FormsModule],
 templateUrl: "./textfield.component.html",
 styleUrls: ["./textfield.component.scss"],
})
export class TextfieldComponent {
 @Input() label: string = ""
 @Input() showRequired: boolean = false
 @Input() placeholder: string = ""
 @Input() value: string = ""
 @Input() readonly: boolean = false
 @Input() disabled: boolean = false

 // classes
 @Input() mainClass: string = "w-full flex flex-col gap-2"
 @Input() labelContainerClass: string = "flex gap-2 items-center"
 @Input() labelClass: string = "block text-gray-700 text-sm font-medium"
 @Input() requiredClass: string = "required-cls"
 @Input() inputClass: string = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-500 readonly:bg-gray-100"

 @Output() valueChange = new EventEmitter<string>()

 onValueChange(event: any): void {
  const target = event.target as HTMLInputElement
  this.value = target.value
  this.valueChange.emit(this.value)
 }
}