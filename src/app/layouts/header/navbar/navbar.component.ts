import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { StyleService } from 'src/app/core/services/style.service';

import { CategoryState } from 'src/app/core/services/states/category.state';

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  activePage: string;
  filterVisible = false;

  categories: any;
  category: any;

  returnUrl: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private styleService: StyleService,
    private categoryState: CategoryState
  ) { }

  ngOnInit() {
    this.watchRouter();
    this.subs.sink = this.categoryState.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.subs.sink = this.categoryState.getCategory().subscribe(res => {
      this.category = res;
    });
  }

  navigate(categoryName?: string) {
    if (categoryName) {
      this.router.navigate([`${categoryName.toLowerCase()}`]);
    } else {
      this.router.navigate(['']);
    }
  }

  watchRouter() {
    this.subs.sink = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const tree: UrlTree =  this.router.parseUrl(this.router.url);
      const segGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
      const segs: UrlSegment[] = segGroup.segments;

      this.activePage = segs[0].path;

      if (this.activePage === 'home' || this.activePage == 'product' || this.activePage == 'image') {
        this.filterVisible = false;
      } else {
        this.filterVisible = true;
      }
    });

    this.subs.sink = this.activatedRoute.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl;
    });
  }

  backToList() {
    this.router.navigate([this.category.category_name.toLowerCase()]);
  }

  closeWindow() {
    if (this.returnUrl) {
      this.router.navigate([decodeURIComponent(this.returnUrl)]);
    } else {
      window.close();
    }
  }

  openSideMenu() {
    this.styleService.openSidemenu();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
