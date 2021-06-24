import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs' ;
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

import { environment } from '../environments/environment';
import { User } from './__models/user';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router ) { }

  title = 'D-Goals';
  ngOnInit(): void {
    this.router.navigate(["/login"]);
  }
}
