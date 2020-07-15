import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { ProductApi } from 'src/app/core/services/apis/product.api';
import { ErrorService } from 'src/app/core/services/error.service';

import { Product } from 'src/app/shared/models/product/product.model';
import { Bootstrap } from 'src/app/shared/models/product/bootstrap.model';
import { ProductStyle } from 'src/app/shared/models/product/product-style.model';

import * as Utils from 'src/app/core/helpers/util';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  private subs = new SubSink();

  SlideOptions = {
    items: 1,
    dots: true,
    autoplay: true,
    autoPlaySpeed: 5000,
    autoPlayTimeout: 5000,
    autoplayHoverPause: true,
    loop: true
  };

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 'auto',
    grabCursor: 'true'
  };

  

  bootstrap$: Observable<Bootstrap>;
  hoverColor = false;

  errorType = '';
  errorMsg = '';

  categories = ['men', 'women', 'kids', 'accessories'];

  constructor(
    private router: Router,
    private errorService: ErrorService,
    private productApi: ProductApi,
  ) {}

  ngOnInit() {
    this.bootstrap$ = this.productApi.getBootstrap();
    this.subs.sink = this.errorService.getErrorType().subscribe(res => {
      this.errorType = res;
    });
    this.subs.sink = this.errorService.getErrorMsg().subscribe(res => {
      this.errorMsg = res;
    });
  }

  switchStyle(product: Product, style: ProductStyle) {
    this.hoverColor = true;
    product.current_style = style;
  }

  viewProductDetail(categoryName: string, id: string) {
    this.router.navigate([`/product/${categoryName.toLowerCase()}/${id}`]);
  }

  retryFailedRequest() {
    location.reload();
  }

  toTitleCase(str) {
    return Utils.ucFirst(str);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
