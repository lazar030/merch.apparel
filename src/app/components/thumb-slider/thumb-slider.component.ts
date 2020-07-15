import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product/product.model';
import { ProductStyle } from 'src/app/shared/models/product/product-style.model';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'thumb-slider',
  templateUrl: './thumb-slider.component.html',
  styleUrls: ['./thumb-slider.component.scss'],
})

export class ThumbSliderComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', { static: false }) slider: IonSlides;
  @Input() product: Product;
  @Output() hoverColorChange = new EventEmitter<boolean>();

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 'auto',
    grabCursor: 'true'
  };

  isBeginning = true;
  isEnd = false;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getSliderStatus();
  }

  getSliderStatus() {
    this.slider.isBeginning().then(res => {
      this.isBeginning = res;
    });
    this.slider.isEnd().then(res => {
      this.isEnd = res;
    });
  }

  switchStyle(product: Product, style: ProductStyle) {
    this.hoverColorChange.emit(true);
    product.current_style = style;
  }

  onMouseOut() {
    this.hoverColorChange.emit(false);
  }

  nextSlide() {
    this.slider.slideNext();
    this.getSliderStatus();
  }

  prevSlide() {
    this.slider.slidePrev();
    this.getSliderStatus();
  }

  onSlideChange() {
    this.getSliderStatus();
  }
}
