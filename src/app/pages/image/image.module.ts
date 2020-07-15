import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PinchZoomModule } from 'ngx-pinch-zoom';

import { ImagePageRoutingModule } from './image-routing.module';

import { ImagePage } from './image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinchZoomModule,
    ImagePageRoutingModule
  ],
  declarations: [ImagePage]
})
export class ImagePageModule {}
