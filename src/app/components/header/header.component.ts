import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input() xsDevice;
  @Input() smDevice;
  userName;

  constructor(
    private router:Router,
    private tokenService:TokenService) { }

  ngOnInit(): void {
    this.userName = this.tokenService.getToken();
  }

  onLogOut(){
    this.tokenService.deleteToken();
    this.navigate('login');
  }

  navigate(url:string){
    this.router.navigate([url]);
  }

}
