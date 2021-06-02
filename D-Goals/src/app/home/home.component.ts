import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private Perfil : Object;
  
  constructor(private http: HttpClient,private router: Router) { 
    this.Perfil= new Object;
 
  }
  
  ngOnInit(): void {
    var perfil = JSON.parse(window.localStorage.getItem("currentUser"));
    let username = perfil["username"].toString();
    let password = perfil["password"].toString();
    // console.log(username);
    var resultado = this.getPerfil(username,password);
    // console.log(perfil);
    // console.log(this.Perfil);
  }

  getPerfil(username:string,password:string){
    let data =JSON.stringify({
      user: username,
      password: password});

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    
    return this.http.post<any>(`http://10.6.130.59:8081/login`,data,httpOptions).subscribe(data =>{
      this.Perfil= data[0];
      if(this.Perfil["habito"]){

      }
      else{
        this.router.navigate(["/newuser"]);
      }
      

      return data;
    })
  }
}
