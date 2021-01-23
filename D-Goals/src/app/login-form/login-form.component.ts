import { Component, OnInit} from '@angular/core';
import { User } from '../__models/user';
import {AuthService} from '../__services/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {}

  model = new User("Carol","1234567123",'','');
  autenticacion = new AuthService(this.http);
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log(this.model)
    this.hacerPeticion()
  }

  hacerPeticion(){
    let resultado = this.autenticacion.login(this.model.username,this.model.password);
    console.log(resultado);
    // let usuario=this.model.name;
    // let pass =this.model.password;
    // let data =JSON.stringify({
    //   user: usuario,
    //   password: pass})
    // console.log(data)
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json','Content-Length': String(data.length) })
  }
  
  // this.http.post('http://10.6.130.59:8081/login',data,httpOptions)
  //   .subscribe(data => {
  //         console.log(data);
  //   }, error => {
  //       console.log(JSON.stringify(error.json()));
  //   })
  }



