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
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewHabitComponent } from './new-habit/new-habit.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CalendarioComponent } from './calendario/calendario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SigninComponent,
    HomeComponent,
    NewUserComponent,
    NewHabitComponent,
    NavBarComponent,
    CalendarioComponent
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
