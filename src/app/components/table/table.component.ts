import { TableDataService } from './../../services/table-data.service';
import { Component, Input, OnChanges, SimpleChanges, SimpleChange, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() colMetaData = [];
  @Input() rowDatas = [];
  @Input() rowsToBeShown;
  inputEl;
  table;
  pageNumber = 1;
  tableData = [];
  iterator = 0;
  rows;

  constructor(
    private tableDataService: TableDataService,
    private el: ElementRef) { }

  ngOnChanges() {
    console.log('this.rowDatas.length:', this.rowDatas.length);
    let i;
    this.tableData = [];
    if (this.rowDatas.length > 0) {
      for (i = 0; i < this.rows; i++) {
        if (this.rowDatas[i]) {
          this.tableData.push(this.rowDatas[i]);
        }
      }
      console.log('tableData:', this.tableData);
    }
  }

  ngOnInit() {
    this.rows = this.tableDataService.getRowsToBeShown();
    this.tableDataService.btnState.subscribe(btnVal => {
      this.buttonHandler(btnVal);
    });
  }

  buttonHandler(btnVal) {
    // console.log('btnVal:', btnVal);
    if (btnVal === 'next') {
      this.pageNumber++;
      this.iterator += this.rowsToBeShown;
      this.rows += this.rowsToBeShown;
    } else if (btnVal === 'prev') {
      this.pageNumber--;
      this.iterator -= this.rowsToBeShown;
      this.rows -= this.rowsToBeShown;
    } else {
      this.pageNumber == btnVal;
      this.iterator = (btnVal-1) * this.rowsToBeShown;
      this.rows = this.iterator + this.rowsToBeShown;
    }
    this.tableData = [];
    console.log('this.iterator:', this.iterator);
    console.log('rows:', this.rows);
    for (let i = this.iterator; i < this.rows; i++) {
      if (this.rowDatas[i]) {
        this.tableData.push(this.rowDatas[i]);
      }
    }
  }

  sorting(col) {
    const index = col.id;
    let rows, switching, i, x, y, shouldSwitch;
    const table = this.el.nativeElement.querySelector('table');

    switching = true;
    col.asc = !col.asc;

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[index];
        y = rows[i + 1].getElementsByTagName("TD")[index];
        if (col.asc) {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  checkAll(event) {
    const inputEl = this.el.nativeElement.querySelectorAll('input[type=checkbox]');
    console.log(inputEl);
    const checkBoxVal = event.target.checked;
    for (let i = 0; i <= this.rowDatas.length; i++) {
      inputEl[i].checked = checkBoxVal;
    }
  }

}
