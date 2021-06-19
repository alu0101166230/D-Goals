import { Component, OnInit } from '@angular/core';
import { User } from "../__models/user";
import {AuthService} from "../__services/auth.service";
import {HttpClient, HttpHeaders } from "@angular/common/http";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    $('#error').addClass("ocultar")
  }

  model = new User("","","","");
  autenticacion = new AuthService(this.http);
  submitted = false;
  
  onSubmit() {
    this.submitted = true;
    console.log(this.model)
    this.hacerPeticion()
  }
  hacerPeticion(){
    let resultado = this.autenticacion.singin(this.model.username,this.model.password,this.model.email);
    console.log(this.model);
  }
  ocultarAlerta(event?: MouseEvent){
    console.log("hi")
    $('#error').removeClass("show");
    $('#error').addClass("ocultar");
  }
}
