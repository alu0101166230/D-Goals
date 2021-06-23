import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-habit',
  templateUrl: './new-habit.component.html',
  styleUrls: ['./new-habit.component.css']
})
export class NewHabitComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    const izquierdo = document.getElementById("grid-izquierdo");
    const derecho = document.getElementById("grid-derecho");

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

    this.http.get<any>(`http://10.6.130.59:8081/habit`,httpOptions).subscribe(data =>{
      for(var x=0; x< data.length; x++){
          var container = document.createElement("div");
          container.classList.add("container");
          document.getElementById("")?.classList.add("")
          var div_imagen = document.createElement("div");
          div_imagen.classList.add("text-center");
          var imagen = document.createElement("img");
          imagen.src="../../assets/Square_200x200.png";
          imagen.classList.add("rounded");
          var div_titulo = document.createElement("div");
          var titulo = document.createElement("h1");
          let element = data[x];
          titulo.textContent = element["nombre"];
          titulo.classList.add("titulo");
          var div_descripcion = document.createElement("div");
          var descripcion = document.createElement("p");
          descripcion.textContent=element["descripcion"];
          descripcion.classList.add("descripcion");
          div_descripcion.appendChild(descripcion);
          div_titulo.appendChild(titulo);
          div_imagen.appendChild(imagen);
          container.appendChild(div_imagen);
          container.appendChild(div_titulo);
          container.appendChild(div_descripcion);
        if(x%2==0){
          izquierdo?.appendChild(container);
        }
        if(x%2==1){
          derecho?.appendChild(container);
        }
        container.addEventListener("click",this.seleccion,false);
      };
      return data;
    })
  }
  guardarHabito(event?: MouseEvent){
    var hora_inicio =(<HTMLInputElement>document.getElementById("start")).value;
    var hora_fin = (<HTMLInputElement>document.getElementById("end"))?.value;
    var dias = document.getElementsByClassName("form-check-input");
    var rango_dias = <any>[];
    var horario = <any>[];
    horario.push(hora_inicio);
    horario.push(hora_fin);
    for (let i = 0; i < dias.length; i++) {
      var dia=dias[i] as HTMLInputElement;
      if(dia.checked ==true){
        rango_dias.push(dias[i].id);
      }
    }
    let nombre_habito = document.getElementById("exampleModalLabel")?.textContent;

    ////////// agregar nueva tarea a la cuenta , hay que modificarla
    let perfil =JSON.parse( window.localStorage.getItem("currentUser")); 
    let data =JSON.stringify({
      user: perfil["username"],
      password: perfil["password"] 
    });


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
      
    this.http.post<any>(`http://10.6.130.59:8081/login`,data,httpOptions).subscribe(data =>{
      
      if(data[0]["habito"][nombre_habito]){
        var habito = data[0]["habito"][nombre_habito]
        habito["dias"]=rango_dias;
        habito["horario"]=horario;

        
        let datos =JSON.stringify({
          user: perfil["username"],
          cambio: "habito",
          valor:data[0]["habito"] 
        });
        this.http.post<any>(`http://10.6.130.59:8081/update_usuario`,datos,httpOptions).subscribe(data =>{});
      }
      else{
        var habito = data[0]["habito"];
        habito[nombre_habito] = {
          "dias":rango_dias,
          "horario":horario,
          "horas":0
        }
        let datos =JSON.stringify({
          user: perfil["username"],
          cambio: "habito",
          valor:data[0]["habito"] 
        });
        this.http.post<any>(`http://10.6.130.59:8081/update_usuario`,datos,httpOptions).subscribe(data =>{});
      }
      
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
      this.router.navigate(["/home"]);
  }

  seleccion(){
    var titulo = document.getElementsByClassName("titulo")[0];
    console.log(titulo.textContent)
    window.localStorage.setItem("habito",titulo.textContent);
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
    document.getElementById("exampleModalLabel").textContent=titulo.textContent;
  }

}
