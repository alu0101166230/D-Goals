import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
  
})
export class NewUserComponent implements OnInit {
  
  constructor(private http: HttpClient,private router: Router,public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    const izquierdo = document.getElementById("grid-izquierdo");
    const derecho = document.getElementById("grid-derecho");

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

    this.http.get<any>(`http://10.6.130.59:8081/habit`,httpOptions).subscribe(data =>{
      console.log(data);
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
  
  guardarHabito(){
     var hora_inicio =(<HTMLInputElement>document.getElementById("start")).value;
     var hora_fin = (<HTMLInputElement>document.getElementById("end"))?.value;
     var dias = document.getElementsByClassName("form-check-input");
     var rango_dias = [];
     var horario = [];
     horario.push(hora_inicio);
     horario.push(hora_fin);
     for (let i = 0; i < dias.length; i++) {
       var dia=dias[i] as HTMLInputElement;
      if(dia.checked ==true){
         rango_dias.push(dias[i].id);
       }
     }
     let nombre_habito = document.getElementById("exampleModalLabel")?.textContent;
     let habito_elegido = {
       nombre: nombre_habito,
       dias: rango_dias,
      horario: horario,
       horas:0
     }
     let perfil =JSON.parse( localStorage.getItem("currentUser")); 
     console.log(perfil["username"]);

     let data =JSON.stringify({
       user: perfil["username"],
       habit: habito_elegido 
     });

    const httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    
     return this.http.post<any>(`http://10.6.130.59:8081/usuario`,data,httpOptions).subscribe(data =>{
       this.router.navigate(["/home"]);  
      return data;
     })
  }
  animal: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  seleccion(){
    // console.log(this.dialog);
    // var dialogRef=this.dialog.open(DialogComponent,{});
    // dialogRef.afterClosed().subscribe(res=>{
    //   this.guardarHabito();
    // });
    // window.localStorage.setItem("habito",titulo[0].textContent);
    // var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    // myModal.show();
    // document.getElementById("exampleModalLabel").textContent=titulo[0].textContent;
  }

}
@Component({
  selector: 'dialog-habito',
  templateUrl: 'dialog-habito.html',
})

  export class DialogHabito{
    constructor(
      public dialogRef: MatDialogRef<DialogHabito>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
      closedialog(): void {
        this.dialogRef.close();
      }
  }
