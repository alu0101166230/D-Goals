import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninComponent} from "./signin/signin.component";
import { NewUserComponent} from "./new-user/new-user.component";
import { HomeComponent } from "./home/home.component"

const routes: Routes = [{ path: 'login', component: LoginFormComponent,  pathMatch: 'full'},
                        { path: 'signin', component: SigninComponent, pathMatch: 'full'},
                        { path: 'newuser', component: NewUserComponent, pathMatch: 'full'},
                        { path: 'home', component: HomeComponent, pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
