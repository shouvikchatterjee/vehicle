import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataResolverService } from '../../services/data-resolver.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAlternativeTheme = false;
  xsDevice;
  smDevice;
  loginForm;
  userName;
  password;
  token;
  isHidePassword = true;
  isLoginFailed = false;
  isLoader = false;
  isServerError = false;
  errorName;
  errorMessage;

  constructor(
    private mediaObserver: MediaObserver,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataResolverService: DataResolverService,
    private loaderService: LoaderService,
    private tokenService: TokenService) {
    // console.log('this constructor:',this);
  }

  ngOnInit(): void {
    this.mediaObserver.media$.subscribe((media: MediaChange) => {
      console.log('this mediaObserver:', this);
      this.xsDevice = (media.mqAlias == 'xs') ? true : false;
      this.smDevice = (media.mqAlias == 'sm') ? true : false;
      console.log(media.mqAlias);
    })
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  logIn() {
    const form = this.loginForm.value;
    this.hideErrorMessage();
    this.isLoader = true;
    this.loaderService.showLoader();
    this.dataResolverService.getLoginDatas().subscribe(items => {
      console.log(items);
      for (let item of items) {
        this.isLoader = false;
        this.loaderService.hideLoader();
        if (form.userName == item.username && form.password == item.password) {
          this.tokenService.setToken(form.userName);
          this.navigate('home');
        }
      }
      this.isLoginFailed = true;
    }, error => {
      console.log(error);
      this.isServerError = true;
      this.errorName = error.name;
      this.errorMessage = error.message;
      this.isLoader = false;
      this.loaderService.hideLoader();
    })

  }

  hideErrorMessage() {
    this.isLoginFailed = false;
    this.isServerError = false;
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

}
