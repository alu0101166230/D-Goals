import { Component, OnInit,NgModule} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Browser } from 'protractor';
import { BrowserModule } from '@angular/platform-browser';
// agregue HttpClientModule, NgModule
import {AppComponent} from '../app.component';
@NgModule({
  imports:[
    BrowserModule,
    HttpClientModule
  ],
  declarations:[
    AppComponent
  ],
  bootstrap:[AppComponent]
})
export class AppModule{}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  constructor(private http: HttpClient){}
  ngOnInit(){
    this.http.post<any>('http://10.6.130.59:8081/login',{
      title: "Prueba de Post Request"
    }).subscribe(data =>{
      this.
    })
  }
}


// @Component({
//   selector: 'app-login-form',
//   templateUrl: './login-form.component.html',
//   styleUrls: ['./login-form.component.css']
// })
// export class LoginFormComponent implements OnInit {

//   constructor(
//     private http: HttpClient,
//   ) { }

//   ngOnInit(): void {
//   }

//   model = new LoginComponent("CArol","1234567123");

//   submitted = false;

//   onSubmit() {this.submitted = true;
//   console.log(this.model)
//   this.hacerPeticion()
//  }

//  hacerPeticion(){
//    let usuario=this.model.name
//    let pass =this.model.password
//   let data =JSON.stringify({
//     user: usuario,
//     password: pass,
//   })
//   console.log(data)
//  const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json','Content-Length': String(data.length) })
//   }
  
//   this.http.post('http://10.6.130.59:8081/login',data,httpOptions)
//     .subscribe(data => {
//           console.log(data);
//     }, error => {
//         console.log(JSON.stringify(error.json()));
//     })
// }

// }
