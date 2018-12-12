import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { JsNgCarouselModule } from 'js-ng-carousel';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JsNgCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
