import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) {
    //Es intencional
  }

  ngOnInit(): void {
    const cuenta = JSON.parse(window.localStorage.getItem("currentUser"));
    if(cuenta["username"]){
    document.getElementById("Perfil").textContent= "¡Hola "+cuenta["username"]+"!";
    var div = document.getElementById("logout");
    var logout = document.createElement("button");
    logout.id="cierre"
    logout.addEventListener('click',()=>{
      this.logout();
    });
    div.appendChild(logout)
  }
  else{
    document.getElementById("Perfil").textContent= "Bienvenido";
  }
  }

  logout(){
    window.localStorage.removeItem('currentUser');
    this.router.navigate(["/login"]);
    var div = document.getElementById("logout");
    div.removeChild(div.children[0])

  }
}
