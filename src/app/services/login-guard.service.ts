import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenService) { }

  canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (!token) {     
      return true;
    }    
    this.navigate('home');  
    return false;
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

}
