import { Directive, ElementRef, inject, output } from "@angular/core"

@Directive({
 selector: "[appOutsideClick]",
 standalone: true,
})
export class OutsideClickDirective {
 private readonly elementRef = inject(ElementRef)

 readonly outsideClick = output<PointerEvent>()

 constructor() {
  // Listen at the document level without HostListener.
  document.addEventListener("pointerdown", this.onPointerDown)
 }

 private readonly onPointerDown = (event: PointerEvent): void => {
  const target = event.target
  if (target instanceof Node && !this.elementRef.nativeElement.contains(target)) {
   this.outsideClick.emit(event)
  }
 }
}