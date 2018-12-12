import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'js-angular-carousel';
  slideList: Object[] = [{
    id: "slide2",
    url: "assets/images/my-pic1.jpg",
    title: "My pic 2",
    alt: "My pic 2",
    description: ""
  }, {
    id: "slide4",
    url: "assets/images/my-pic2.jpg",
    title: "My pic 4",
    alt: "My pic 4",
    description: ""
  }, {
    id: "slide5",
    url: "assets/images/my-pic3.jpg",
    title: "My pic 5",
    alt: "My pic 5",
    description: ""
  }];

}
