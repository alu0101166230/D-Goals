import { Component, OnInit} from '@angular/core';
import { User } from '../__models/user';
import {AuthService} from '../__services/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { skip } from 'rxjs/operators';


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
}
