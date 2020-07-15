import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { Image } from 'src/app/shared/models/product/image.model';
import { ImageFacade } from 'src/app/core/services/facades/image.facade';

import { ErrorService } from 'src/app/core/services/error.service';

@Component({
  selector: 'image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit, OnDestroy {
  @ViewChild('imageView', { static: false }) imageView: ElementRef;

  private subs = new SubSink();
  
  image$: Observable<Image>;

  errorType: any;
  errorMsg: any;

  constructor(
    private errorService: ErrorService,
    private imageFacade: ImageFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.watchHttpError();
    this.subs.sink = this.activatedRoute.params.subscribe(params => {
      this.image$ = this.imageFacade.getImage(params.id);
    });
  }

  scrollToHorizontalCenter() {
    try {
      this.imageView.nativeElement.scrollLeft = (1896 - this.imageView.nativeElement.clientWidth) / 2;
    } catch (err) {
      console.log(err);
    }
  }

  watchHttpError() {
    this.subs.sink = this.errorService.getErrorType().subscribe(res => {
      this.errorType = res;
    });
    this.subs.sink = this.errorService.getErrorMsg().subscribe(res => {
      this.errorMsg = res;
    });
  }

  retryFailedRequest() {
    location.reload();
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
