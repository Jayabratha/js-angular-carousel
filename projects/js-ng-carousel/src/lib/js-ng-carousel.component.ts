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
import { CarouselConfig } from './config.model';

@Component({
  selector: 'js-ng-carousel',
  templateUrl: './js-ng-carousel.component.html',
  styleUrls: ['./js-ng-carousel.component.css']
})
export class JsNgCarouselComponent implements OnChanges, OnInit, OnDestroy {
  @Input() play: boolean = true;
  @Input() slideItems: SlideItem[];
  @Input() config: CarouselConfig;

  @Output() carouselReady = new EventEmitter<boolean>();
  @Output() carouselLoading = new EventEmitter<number>();

  activeSlide;
  carouselId;
  loadCount: number = 0;
  itemCount: number = 0;
  imageLoadProress: number = 0;
  isLoading: boolean = true;
  conf: CarouselConfig = {
    slideInterval: 5000,
    leftArrowClassName: '',
    rightArrowClassName: '',
    showText: true,
    textAlignment: 'right',
    applyBoxShadow: false
  }
  showText: boolean = true;
  textAlignment: string = 'right';

  ngOnInit() {
    this.itemCount = this.slideItems.length;
    this.activeSlide = this.slideItems[0];
    this.activeSlide.active = true;
    this.conf = Object.assign(this.conf, this.config);
  }

  updateProgress(e) {
    this.loadCount++;
    let progress = (this.loadCount / this.itemCount) * 100;
    this.carouselLoading.emit(progress);
    if (progress === 100) {
      this.onLoadComplete();
    }
  }

  onLoadComplete() {
    this.isLoading = false;
    this.carouselReady.emit(true);
    this.start();
  }

  ngOnChanges(changes: SimpleChanges) {
    let currentValue;
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

  showNext(swipe) {
    if(swipe) {
      this.pause();
    }
    const nextSlide = this.getNextElement('left', this.activeSlide);
    this.slide('left', nextSlide);
    if(swipe) {
      this.start();
    }
  }

  showPrev(swipe) {
    if(swipe) {
      this.pause();
    }
    const nextSlide = this.getNextElement('right', this.activeSlide);
    this.slide('right', nextSlide);
    if(swipe) {
      this.start();
    }
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

  slide(direction, nextSlide) {
    let nextPrevClass = "";
    const transitionDuration = 800;
    if (direction === 'left') {
      nextPrevClass = "next";
    } else {
      nextPrevClass = "prev";
    }
    nextSlide[nextPrevClass] = true;
    setTimeout(() => {
      this.activeSlide[direction] = true;
      nextSlide[direction] = true;
    }, 100);
    setTimeout(() => {
      this.activeSlide[direction] = false;
      nextSlide[direction] = false;
      nextSlide[nextPrevClass] = false;
      this.activeSlide["active"] = false;
      nextSlide["active"] = true;
      this.activeSlide = nextSlide;
    }, transitionDuration + 100);
  }

  start() {
    let slideInterval = this.config.slideInterval || 5000;
    //Clear if a interval is set
    if (this.carouselId) {
      clearInterval(this.carouselId);
    }
    //Start a new Carousel
    this.carouselId = setInterval(() => {
      this.showNext(false);
    }, slideInterval);
  }

  pause() {
    clearInterval(this.carouselId);
  }

  goToItem(index, slide) {
    let direction, currentActiveIndex = this.getIndexOf(this.activeSlide);

    if (currentActiveIndex > index) {
      direction = 'right';
    } else {
      direction = 'left';
    }

    this.slide(direction, slide);
  }

}
