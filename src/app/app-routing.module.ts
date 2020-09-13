import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: [
      { id: 1, name: 'abc' },
      { id: 2, name: 'xyz' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
