// src/app/core/service/user.service.ts

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {User} from "../../shared/models/user.model";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

getUser(): Observable<User[]> {
  return this.http.get('/api/user')
    .map((res: Response) => res.json().response.map((user: User) => new User().deserialize(user)));
}

