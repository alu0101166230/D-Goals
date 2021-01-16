import { Component, OnInit} from '@angular/core';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  model = new LoginComponent("Nombre","Contraseña");

  submitted = false;

  onSubmit() {this.submitted = true;
  console.log(this.model)
  hacerPeticion()
 }

 hacerPeticion(){
   
 }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
