import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, RouterStateSnapshot, ActivatedRouteSnapshot  } from '@angular/router';
import { HttpInterceptor } from  '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { User } from './__models/user';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: 'canActivateTeam',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
    }
  ]})
export class AppModule { }
