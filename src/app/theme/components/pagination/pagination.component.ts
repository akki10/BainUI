import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.html',
    styleUrls: ['./pagination.css']
})

export class PaginationComponent implements OnInit, OnChanges {
    constructor() { }

    @Input() count: number;
    @Input() pageSize = 10;
    @Input() currPage = 1;
    @Input() pageSuffix: any;

    @Output() currPageChange: EventEmitter<any> = new EventEmitter();

    // pager object
    pager: any = {};

    ngOnInit() {
        this.setPage(1);
    }

    ngOnChanges() {
      // this.setPage(1);
        console.log(this.currPage);
        console.log(this.count);
        if (this.currPage === 1) {
            this.pager = this.getPager(this.count, 1, this.pageSize);
        }
    }

    setPage(page) {
        if (page < 1 || page > this.pager.totalPages) {
          return;
        }
        const isNewPage = this.currPage !== page;
        this.pager = this.getPager(this.count, page, this.pageSize);
        this.currPage = page;
        if (isNewPage) {
          this.currPageChange.emit(this.currPage);
        }
    }

  getPager(totalItems: number, currentPage: number, pageSize: number) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    // console.log("totalPages");console.log(totalPages);

    if (totalPages > 1000) {
      totalPages = 1000;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 3 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages: number[] = [];
    for (let i = startPage; i < endPage + 1; i++) {
      pages.push(i);
    }

    // console.log("pages array from the pagerService");console.log(pages);

    // return object with all pager properties required by the view
    const startItem = ( pageSize * (currentPage - 1) ) + 1;
    let endItem = 0;
    if (currentPage > totalItems / pageSize) {
      endItem = ( (currentPage - 1) * pageSize) + (totalItems % pageSize);
    } else {
      endItem = pageSize * currentPage;
    }
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      startItem: startItem,
      endItem: endItem,
      pages: pages
    };
  }

    // getPager() {
    //   return this.pager;
    // }
}
