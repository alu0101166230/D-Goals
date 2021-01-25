import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninComponent} from "./signin/signin.component";

const routes: Routes = [{ path: 'login', component: LoginFormComponent,  pathMatch: 'full'},
                        { path: 'signin', component: SigninComponent, pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
