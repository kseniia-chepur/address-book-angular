import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlurOnClick]',
   standalone: true,
})
export class BlurOnClickDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    this.el.nativeElement.blur();
  }
}
