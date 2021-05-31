import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../__models/user';

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

    return this.http.post<any>(`http://10.6.130.59:8081/singin`,data,httpOptions).subscribe(data =>{
        console.log(data);
    }, error => {
        console.log(JSON.stringify(error.json()));
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

    return this.http.post<any>(`http://10.6.130.59:8081/login`,data,httpOptions).subscribe(data =>{
      // console.log(data);
      let datos = data[0];
      let resultado = new User(datos["nombre"],datos["password"],datos["correo"],datos["_id"]);
      localStorage.setItem('currentUser',JSON.stringify(resultado));
      this.currentUserSubject.next(resultado);
      return resultado;
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
  }

  // Elimina la cuenta del usuario <aka cookie>
  logout(){
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next();
  }
  current_user(){
    // console.log(localStorage['currentUser']);
    // this.currentUserSubject;
    return localStorage['currentUser'];
  }
  // Getter de usuario de la sesion
  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }
}
