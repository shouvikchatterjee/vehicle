import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const data = this.activatedRoute.data;
    this.activatedRoute.data.subscribe((val) => {
      console.log('val:', val);
    }, error => {
      console.log('error:', error);
    }, () => {

    });
    console.log('data:', data);
  }

}
