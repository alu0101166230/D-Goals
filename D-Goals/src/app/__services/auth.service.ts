import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  // Getter de usuario de la sesion
  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  // Metodo login que pide un username y un password
  login(username:string,password:string){
    // Retornamos el resultado del POST, y preparamos para escuchar en la ruta /login
    return this.http.post<any>(`${environment.apiUrl}/login`,{username,password})
      .pipe(map(user =>{
        localStorage.setItem('currentUser',JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  // Elimina la cuenta del usuario <aka cookie>
  logout(){
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next();
  }
}
