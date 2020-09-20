import { TableDataService } from './../../services/table-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() numberOfRows;
  numberOfPages = [];
  selectedBtn = 1;
  rowsToBeShown;

  constructor(private tableDataService: TableDataService) { }

  ngOnChanges() {
    let i, j;
    this.numberOfPages = [];
    for (i = this.rowsToBeShown, j = 1; i < this.numberOfRows; i += this.rowsToBeShown, j++) {
      this.numberOfPages.push(j);
    }
    this.numberOfPages.push(j);
  }

  ngOnInit(): void {
    this.rowsToBeShown = this.tableDataService.getRowsToBeShown();
  }

  prevHandler() {
    this.selectedBtn--;
    this.tableDataService.prevHandler();
  }

  nextHandler() {
    this.selectedBtn++;
    this.tableDataService.nextHandler();
  }

  pageHandler(pageNum) {
    this.selectedBtn = pageNum;
    this.tableDataService.pageHandler(pageNum);
  }
}
