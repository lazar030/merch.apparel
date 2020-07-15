import { Injectable } from '@angular/core';
import { ProductApi } from '../apis/product.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductState } from '../states/product.state';
import { FilterState } from '../states/filter.state';

import { Bootstrap } from 'src/app/shared/models/product/bootstrap.model';
import { Category } from 'src/app/shared/models/category.interface';
import { Product } from 'src/app/shared/models/product/product.model';
import { ProductStyle } from 'src/app/shared/models/product/product-style.model';
import { Pagination } from 'src/app/shared/models/pagination/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {
  constructor(
    private productApi: ProductApi,
    private productState: ProductState,
    private filterState: FilterState,
  ) {}

  setProduct(product: Product) {
    this.productState.setProduct(product);
  }
  
  getProduct$(): Observable<Product> {
    return this.productState.getProduct$();
  }

  getProducts$(): Observable<Product[]> {
    return this.productState.getProducts();
  }

  loadProduct(uuid: string) {
    this.productApi.getProductById(uuid).subscribe((res: Product) => {
      this.productState.setProduct(res);
    });
  }

}
