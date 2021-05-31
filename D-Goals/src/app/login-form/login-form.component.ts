import { Component, OnInit} from '@angular/core';
import { User } from '../__models/user';
import {AuthService} from '../__services/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor( private http: HttpClient,private router: Router ) { }

  ngOnInit(): void {}

  model = new User("Carol","1234567123",'','');
  autenticacion = new AuthService(this.http);
  submitted = true;

  onSubmit() {
    this.submitted = true;
    this.autenticacion.login(this.model.username,this.model.password);
    this.hacerPeticion()
  }

  hacerPeticion(){    
    
    // setTimeout(this.autenticacion.current_user(),100)
    console.log(this.autenticacion.currentUserValue);
    // console.log(this.autenticacion.current_user())
  }
  
  // this.http.post('http://10.6.130.59:8081/login',data,httpOptions)
  //   .subscribe(data => {
  //         console.log(data);
  //   }, error => {
  //       console.log(JSON.stringify(error.json()));
  //   })
}



