import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsNgCarouselComponent } from './js-ng-carousel.component';

@NgModule({
  declarations: [
    JsNgCarouselComponent
  ],
  exports: [
    JsNgCarouselComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JsNgCarouselModule { }
