import { Component, Input, OnChanges, SimpleChanges, SimpleChange, ElementRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() colMetaData = [];
  @Input() rowDatas = [];
  inputEl;
  table;

  constructor(private el: ElementRef) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    console.log('simpleChanges:', simpleChanges);
    const rowDatas: SimpleChange = simpleChanges.rowDatas;
    const colMetaData: SimpleChange = simpleChanges.colMetaData;
    if (rowDatas) {
      console.log('rowDatas:', rowDatas.currentValue);
    }
    if (colMetaData) {
      console.log('colMetaData:', colMetaData.currentValue);
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
