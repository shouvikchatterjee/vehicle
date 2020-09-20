import { ActivatedRoute } from '@angular/router';
import { TableDataService } from './../../services/table-data.service';
import { DataResolverService } from './../../services/data-resolver.service';
import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  xsDevice = false;
  smDevice = false;
  isLoader = false;
  tableData={
    colMetaData:[],
    rowDatas:[],
    rowsToBeShown:5
  }

  constructor(
    private mediaObserver: MediaObserver,
    private loaderService: LoaderService,
    private tableDataService: TableDataService,
    private dataResolverService: DataResolverService) { }

  ngOnInit(): void {

    this.mediaObserver.media$.subscribe((media: MediaChange) => {
      this.xsDevice = (media.mqAlias == 'xs') ? true : false;
      this.smDevice = (media.mqAlias == 'sm') ? true : false;
      // console.log(media.mqAlias);
    })

    this.tableDataService.setRowsToBeShown(this.tableData.rowsToBeShown);

    this.loaderService.showLoader();
    this.dataResolverService.getVehiclesDatas().subscribe(datas => {
      this.loaderService.hideLoader();
      this.tableData.rowDatas = datas;
    },error=>{
      console.log('error:', error);
      this.loaderService.hideLoader();
    });
    
    this.tableData.colMetaData = [
      {
        id: 1,
        label: 'Make',
        key: 'make',
        width: 40,
        asc:false
      },
      {
        id: 2,
        label: 'Year',
        key: 'year',
        width: 50,
        asc:false
      },
      {
        id: 3,
        label: 'Sold Date',
        key: 'soldDate',
        width: 120,
        asc:false
      },
      {
        id: 4,
        label: 'VIN',
        key: 'vin',
        width: 130,
        asc:false
      },
      {
        id: 5,
        label: 'Model',
        key: 'model',
        width: 60,
        asc:false
      },
      {
        id: 6,
        label: 'Series',
        key: 'series',
        width: 60,
        asc:false
      },
      {
        id: 7,
        label: 'Location City',
        key: 'locationCity',
        width: 70,
        asc:false
      },
      {
        id: 8,
        label: 'Odometer',
        key: 'odometer',
        width: 80,
        asc:false
      },
      {
        id: 9,
        label: 'Odometer Unit Of Measure',
        key: 'odometerUnitOfMeasure',
        width: 100,
        asc:false
      },
      {
        id: 10,
        label: 'State Abbreviation',
        key: 'stateAbbreviation',
        width: 80,
        asc:false
      },
      {
        id: 11,
        label: 'Interior Color',
        key: 'interiorColor',
        width: 60,
        asc:false
      },
      {
        id: 12,
        label: 'Exterior Color',
        key: 'exteriorColor',
        width: 60,
        asc:false
      }
    ]
  }

  showNumberOfRows(rowNum){
    this.tableData.rowsToBeShown = rowNum;
  }

  prevHandler(e) {
    console.log(e);
  }

  nextHandler(e) {
    console.log(e);
  }

}
