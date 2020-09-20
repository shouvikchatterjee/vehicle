import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.scss']
})
export class FilterSelectionComponent implements OnInit {
  @Input() colMetaData = [];
  @Input() rowDatas = [];
  filterHeaders = [];
  filterDatas = [];
  filterValues = [];
  make = new Set();

  ngOnChanges() {
    console.log('colMetaData:', this.colMetaData);
    if (this.colMetaData) {
      this.filterHeaders = JSON.parse(JSON.stringify(this.colMetaData));
      console.log('this.filterHeaders:',this.filterHeaders);
      
    }
    if (this.rowDatas) {
      this.filterDatas = JSON.parse(JSON.stringify(this.rowDatas));      
      console.log('this.filterDatas:',this.filterDatas);
    }

    if (this.filterDatas) {
      this.filterDatas.forEach(data => {
        // this.make.push(data.make);
        this.make.add(data.make);
        this.filterValues.push(Object.values(data));
      });
      console.log('this.filterValues:', this.filterValues);
      // this.make = [...new Set(this.make)]; 
      
      // this.make = [...new Set(this.make)];

      console.log('this.make:', this.make);

    }

  }

  constructor() { }

  ngOnInit(): void {

  }
}
