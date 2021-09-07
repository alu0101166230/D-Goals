import { Component, OnInit} from '@angular/core';
import { User } from '../__models/user';
import {AuthService} from '../__services/auth.service'
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { skip } from 'rxjs/operators';
import * as $ from "jquery";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  hide = true;
  constructor( private http: HttpClient,private router: Router ) { }
  
  ngOnInit(): void {
    $('#error').addClass("ocultar")
  }
  

  model = new User('','','','');
  autenticacion = new AuthService(this.http);
  submitted = false;
  onSubmit() {
    this.submitted = true;
    var username = (<HTMLInputElement>document.getElementById("name")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    this.autenticacion.login(username,password);
    this.hacerPeticion();
  }
  hacerPeticion(){    
    var tmp = this.autenticacion.current_user();
    tmp.pipe(skip(1)).subscribe(   
       (value)=>{
         this.router.navigate(["/home"]);
       }
    );
  }
  ocultarAlerta(event?: MouseEvent){
    $('#error').removeClass("show");
    $('#error').addClass("ocultar");
  }
}
