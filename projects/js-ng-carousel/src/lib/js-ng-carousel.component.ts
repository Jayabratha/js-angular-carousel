import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { SlideItem } from './slide-item.model';

@Component({
  selector: 'js-ng-carousel',
  templateUrl: './js-ng-carousel.component.html',
  styleUrls: ['./js-ng-carousel.component.css']
})
export class JsNgCarouselComponent implements OnChanges, OnInit, OnDestroy {
  @Input() play: boolean = true;
  @Input() slideItems: SlideItem[];

  @Output() carouselReady = new EventEmitter<boolean>();
  @Output() carouselLoading = new EventEmitter<number>();

  constructor() {
  }

  activeSlide;
  carouselId;
  loadCount: number = 0;
  itemCount: number = 0;
  imageLoadProress: number = 0;
  isLoading: boolean = true;

  ngOnInit() {
    this.itemCount = this.slideItems.length;
    this.activeSlide = this.slideItems[0];
    this.activeSlide.active = true;
  }

  updateProgress(e) {
    this.loadCount++;
    let progress = (this.loadCount/this.itemCount) * 100;
    this.carouselLoading.emit(progress);
    if (progress === 100) {
      this.onLoadComplete();
    }
  }

  onLoadComplete() {
      setTimeout(() => {
        this.isLoading = false;
        this.carouselReady.emit(true);
        this.start();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    let currentValue;
    console.log(changes);
    for (let propName in changes) {
      if (propName === 'play') {
        currentValue = changes[propName].currentValue;
        if (currentValue) {
          this.start();
        } else {
          this.pause();
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.carouselId) {
      clearInterval(this.carouselId);
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.pause();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.start();
  }

  showNext() {
    this.slide('left');
  }

  showPrev() {
    this.slide('right');
  }

  getIndexOf(slide) {
    let i;
    for (i = 0; i < this.itemCount; i++) {
      let thisSlide = this.slideItems[i];
      if (thisSlide.id === slide.id) {
        return i;
      }
    }
  }

  getNextElement(direction, slide) {
    const activeElemIndex = this.getIndexOf(slide);
    const lastIndex = this.itemCount - 1;
    const delta = direction === 'right' ? -1 : 1;
    const itemIndex = (activeElemIndex + delta) % this.itemCount;

    return itemIndex === -1 ? this.slideItems[lastIndex] : this.slideItems[itemIndex];
  }

  slide(direction) {
    let nextPrevClass = "";
    const nextSlide = this.getNextElement(direction, this.activeSlide);
    if (direction === 'left') {
      nextPrevClass = "next";
    } else {
      nextPrevClass = "prev";
    }
    nextSlide[nextPrevClass] = true;
    setTimeout(() => {
      this.activeSlide[direction] = true;
      nextSlide[direction] = true;
    }, 10);
    setTimeout(() => {
      this.activeSlide[direction] = false;
      nextSlide[direction] = false;
      nextSlide[nextPrevClass] = false;
      this.activeSlide["active"] = false;
      nextSlide["active"] = true;
      this.activeSlide = nextSlide;
    }, 810);
  }

  start() {
    //Clear if a interval is set
    if (this.carouselId) {
      clearInterval(this.carouselId);
    }
    //Start a new Carousel
    this.carouselId = setInterval(() => {
      this.showNext();
    }, 5000);
  }

  pause() {
    clearInterval(this.carouselId);
  }

}
