import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../__models/user';
import {Router} from "@angular/router";
import * as $ from "jquery";
@Injectable({ providedIn: 'root' })

// Exportamos el servicio de autenticacion
export class AuthService {
  // creamos variables globales de la clase
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  model = new User('','','','');

  
  // En el constructor de la clase creamos la cookie almacenada localmente
  constructor(private http: HttpClient) {
    localStorage.setItem('currentUser',this.model.get_json());
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.model.get_json()));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  singin(username:string,password:string,correo:string){
    // Retornamos el resultado del POST, y preparamos para escuchar en la ruta /login
    
    let data =JSON.stringify({
      user: username,
      password: password,
      email:correo});

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

    return this.http.post(`api/singin`,data,httpOptions).subscribe(data =>{
      let datos:any = data;  
      
      let resultado = new User(datos["nombre"],datos["password"],datos["correo"],datos["_id"]);
      localStorage.setItem('currentUser',JSON.stringify(resultado));
      this.currentUserSubject.next(resultado);

    }, error => {
      $('#error').addClass("show");
      $('#error').removeClass("ocultar");
    });
  }

  // Metodo login que pide un username y un password
  login(username:string,password:string){
    // Retornamos el resultado del POST, y preparamos para escuchar en la ruta /login
    
    let data =JSON.stringify({
      user: username,
      password: password});

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

    return this.http.post<any>(`api/login`,data,httpOptions).subscribe(data =>{
      if(data[0]){
        let datos = data[0];
        let resultado = new User(datos["nombre"],datos["password"],datos["correo"],datos["_id"]);
        localStorage.setItem('currentUser',JSON.stringify(resultado));
        this.currentUserSubject.next(resultado);
        return resultado;
      }
      else{
        $('#error').addClass("show")
        $('#error').removeClass("ocultar");
        return 0;
      }
      
    }, error => {
        console.log(JSON.stringify(error.json()));
        return 0;
    });
  }

  // Elimina la cuenta del usuario <aka cookie>
  logout(){
    localStorage.removeItem('currentUser');
  }
  current_user(){

    return this.currentUserSubject;
  }
  // Getter de usuario de la sesion
  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }
}
