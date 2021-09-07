import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    const cuenta = JSON.parse(window.localStorage.getItem("currentUser"));
    if(cuenta["username"]){
    document.getElementById("Perfil").textContent= "¡Hola "+cuenta["username"]+"!";
  }
  }

}
