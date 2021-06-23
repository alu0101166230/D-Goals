import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private Perfil : any;
  
  constructor(private http: HttpClient,private router: Router) { 
    this.Perfil= new Object;
 
  }
  
  ngOnInit(): void {
    var tmp =  window.localStorage.getItem("currentUser")
    
    if(tmp){
      var perfil = JSON.parse(tmp);
      let username = perfil["username"].toString();
      let password = perfil["password"].toString();
      this.getPerfil(username,password);
    }
    

  }
  getPerfil(username:string,password:string){
    let data =JSON.stringify({
      user: username,
      password: password});

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    
    return this.http.post<any>(`http://10.6.130.59:8081/login`,data,httpOptions).subscribe(data =>{
      this.Perfil= data[0]["habito"];
      if(this.Perfil["vacio"]!=true){
        Object.keys(this.Perfil).forEach(key => {
          // Dias es array de string
          let dias =this.Perfil[key]["dias"];

          // today es tipo Number
          var today = new Date().getDay();
          if(dias.includes(this.number_to_day(today))){
            var actividades = document.getElementById("actividades");
            var cuadro = document.createElement("div");
            var nombre = document.createElement("div");
            var inicio = document.createElement("div");
            var fin = document.createElement("div");
            var hecho = document.createElement("mat-icon");
            var no_hecho = document.createElement("mat-icon");
            var tiempo = document.createElement("div");
            var botones = document.createElement("div");
            var guion = document.createElement("p");
            tiempo.classList.add("tiempo");
            guion.textContent="-";
            botones.classList.add("Botones");
            cuadro.classList.add("Cuadrado");
            hecho.classList.add("done");
            no_hecho.classList.add("fail");
            nombre.textContent = key;
            inicio.textContent = this.Perfil[key]["horario"][0];
            fin.textContent = this.Perfil[key]["horario"][1];
            hecho.textContent = "V";
            no_hecho.textContent = "X";
            hecho.addEventListener('click',()=>{
              this.tarea_cumplida(nombre,inicio,fin,cuadro);
            });
            no_hecho.addEventListener('click',()=>{
              this.tarea_no_cumplida(nombre,cuadro);
            });
            cuadro.appendChild(nombre);
            tiempo.appendChild(inicio);
            tiempo.appendChild(guion);
            tiempo.appendChild(fin);
            botones.appendChild(hecho);
            botones.appendChild(no_hecho);
            cuadro.appendChild(tiempo);
            cuadro.appendChild(botones); 
            actividades.appendChild(cuadro);
          }

      })
      }
      else{
        this.router.navigate(["/newuser"]);
      }
      return data;
    })
  }
  number_to_day(numero:Number){
    switch(numero){
      case 0:{return "Domingo";}
      case 1:{return "Lunes";}
      case 2:{return "Martes";}
      case 3:{return "Miercoles";}
      case 4:{return "Jueves";}
      case 5:{return "Viernes";}
      default:{return "Sabado";}
    }
  }
  tarea_cumplida(tarea:HTMLDivElement,inicio:HTMLDivElement,fin:HTMLDivElement,elemento:HTMLDivElement){
    tarea.parentNode.parentNode.removeChild(elemento)
    var tiempo_i = inicio.textContent;
    var tiempo_f = fin.textContent;
    // console.log(tiempo_i.substring(3,5));
    var tmp_i = Number(tiempo_i.substring(0,2));
    var tmp_f = Number(tiempo_f.substring(0,2));

    var tiempo_total = tmp_f-tmp_i;

    tmp_i =Number(tiempo_i.substring(3,5))
    tmp_f = Number(tiempo_f.substring(3,5))

    var decimas  = Math.abs((tmp_f - tmp_i)/60);
    tiempo_total= tiempo_total+decimas;
    // console.log(tiempo_total);

    const cuenta = JSON.parse(window.localStorage.getItem("currentUser"));
    let data =JSON.stringify({
      user: cuenta["username"],
      password: cuenta["password"]});

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

    return this.http.post<any>(`http://10.6.130.59:8081/login`,data,httpOptions).subscribe(data =>{
      var habito = data[0]["habito"][tarea.textContent]
      habito["horas"]+=tiempo_total;
      // console.log(data[0]["habito"]);

      let datos =JSON.stringify({
        user: cuenta["username"],
        cambio: "habito",
        valor:data[0]["habito"]
      });
      this.http.post<any>(`http://10.6.130.59:8081/update_usuario`,datos,httpOptions).subscribe(data =>{});

      data[0]["numero_de_horas_totales"]+=tiempo_total;
      datos =JSON.stringify({
        user: cuenta["username"],
        cambio: "numero_de_horas_totales",
        valor:data[0]["numero_de_horas_totales"]
      });
      this.http.post<any>(`http://10.6.130.59:8081/update_usuario`,datos,httpOptions).subscribe(data =>{});

      data[0]["tareas_cumplidas"]+=1;
      datos =JSON.stringify({
        user: cuenta["username"],
        cambio: "tareas_cumplidas",
        valor:data[0]["tareas_cumplidas"]
      });
      this.http.post<any>(`http://10.6.130.59:8081/update_usuario`,datos,httpOptions).subscribe(data =>{});
      
      data[0]["racha"]+=1;
      datos =JSON.stringify({
        user: cuenta["username"],
        cambio: "racha",
        valor:data[0]["racha"]
      });
      this.http.post<any>(`http://10.6.130.59:8081/update_usuario`,datos,httpOptions).subscribe(data =>{});
      
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
    
  } 

  tarea_no_cumplida(tarea:HTMLDivElement,elemento:HTMLDivElement){
    const cuenta = JSON.parse(window.localStorage.getItem("currentUser"));
    tarea.parentNode.parentNode.removeChild(elemento)
    let data =JSON.stringify({
      user: cuenta["username"],
      password: cuenta["password"]});

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

    return this.http.post<any>(`http://10.6.130.59:8081/login`,data,httpOptions).subscribe(data =>{
      var racha_broken = 0
      
      let datos =JSON.stringify({
        user: cuenta["username"],
        cambio: "racha",
        valor:racha_broken
      });
      this.http.post<any>(`http://10.6.130.59:8081/update_usuario`,datos,httpOptions).subscribe(data =>{});

    }, error => {
        console.log(JSON.stringify(error.json()));
    });
  }
  crearHabito(event?: MouseEvent){
    this.router.navigate(["/newhabit"]);
  }
}