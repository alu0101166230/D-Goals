import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router) { 
    // this.habito_elegido =0;
  }

  ngOnInit(): void {
    const tabla = document.getElementById("tabla");

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

    this.http.get<any>(`http://10.6.130.59:8081/habit`,httpOptions).subscribe(data =>{
      console.log(data);
      for(var x=0; x< data.length; x++){
        var tr = document.createElement("tr");
        var th_name= document.createElement("th");
        var th_description= document.createElement("th");
        var th_img=document.createElement("th");

        // tr.onclick =this.seleccion(tr);
        tr.addEventListener("click",this.seleccion,false);

        let element = data[x];
        th_name.textContent =element["nombre"];
        th_description.textContent = element["descripcion"];
        th_img.textContent= "asdfasdf"; 
        tr.appendChild(th_name);
        tr.appendChild(th_description);
        tr.appendChild(th_img);
        tabla?.appendChild(tr);

      };
      return data;
    })
  }
  
  seleccion(){
    console.log(this)
    // this.habito_elegido=this.childNodes[0].textContent;
    // Object.getPrototypeOf(this).route
    // NewUserComponent.router.navigate(["/newhabit"]);
  }

}
