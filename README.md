# JsAngularCarousel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## How to install and use
Run `npm install --save js-ng-carousel`

Once installed install hammerjs using `npm install --save hammerjs` to use touch gestures.

Import HammerJS in your app using `import hammerjs` in your 'main.ts' file and import 'JsNgCarouselModule' module using `import { JsNgCarouselModule } from 'js-ng-carousel'` in your 'app.module.ts' file.

## How to configure
Pass the slides items array using [slideItems] input.
Each slide item shall be of below format

    id: string --> id of the slide item
    
    url: string --> url of the background image in assets folder
    
    title: string --> title of the slide
    
    alt: string --> alternate text for background image
    
    description: string --> description text of the slide
    

Configuration can be passed using the [config] input

    slideInterval: number --> slide interval time | default is 5000 
    
    leftArrowClassName: string --> css string for the left arrow icon
    
    rightArrowClassName: string --> css string for the right arrow icon
    
    showText: boolean --> whether to show title and description text | default is true
    
    textAlignment: string --> allowed alignment values: 'right' | 'center' | 'left' | default is 'left'
  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
