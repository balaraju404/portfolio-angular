import { CommonModule } from "@angular/common"
import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
 selector: "lib-button",
 imports: [CommonModule],
 templateUrl: "./button.component.html",
 styleUrls: ["./button.component.css"],
})
export class ButtonComponent {
 /** Text shown on the button */
 @Input() label: string = "Button"

 /** Whether button is disabled */
 @Input() disabled: boolean = false

 /** Optional icon (before text) */
 @Input() icon?: string

 /** Parent can control button color scheme */
 @Input() variant:
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "outline"
  | "ghost" = "primary"

 /** Custom classes for parent overrides */
 @Input() customClass: string = ""

 /** Emits click event to parent */
 @Output() clicked = new EventEmitter<MouseEvent>()

 onClick(event: MouseEvent) {
  if (!this.disabled) {
   this.clicked.emit(event)
  }
 }

 /** Computed Tailwind classes for variants */
 get buttonClass(): string {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none transition duration-150 ease-in-out"

  const variants: Record<string, string> = {
   primary: "bg-blue-600 text-white hover:bg-blue-700",
   secondary: "bg-gray-600 text-white hover:bg-gray-700",
   success: "bg-green-600 text-white hover:bg-green-700",
   danger: "bg-red-600 text-white hover:bg-red-700",
   warning: "bg-yellow-500 text-black hover:bg-yellow-600",
   outline: "border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300",
   ghost: "text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300",
  }

  const disabledStyle = "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"

  return [
   base,
   this.disabled ? disabledStyle : variants[this.variant],
   this.customClass,
  ].join(" ")
 }
}