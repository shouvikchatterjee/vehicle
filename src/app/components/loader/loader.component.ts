import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {

  subscription:Subscription;
  isLoaderShow = false;

  constructor(private loaderService:LoaderService) {}

  ngOnInit(): void {
    console.log('loader');
    this.subscription = this.loaderService.onLoaderStatus().subscribe(response=>{
      console.log('response: ',response);
      this.isLoaderShow = response.status;  
    },
    error=>{
      console.log('error:', error);
    })
  }

}
