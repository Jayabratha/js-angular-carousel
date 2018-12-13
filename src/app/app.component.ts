import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'js-angular-carousel';
  slideList: Object[] = [{
    id: "slide1",
    url: "assets/images/my-pic1.jpg",
    title: "My pic 1",
    alt: "My pic 1",
    description: ""
  }, {
    id: "slide2",
    url: "assets/images/my-pic2.jpg",
    title: "My pic 2",
    alt: "My pic 2",
    description: ""
  }, {
    id: "slide3",
    url: "assets/images/my-pic3.jpg",
    title: "My pic 3",
    alt: "My pic 3",
    description: ""
  }];
  carouselConfig = {
    leftArrowClassName: 'icon-angle-left',
    rightArrowClassName: 'icon-angle-right'
  }

}
