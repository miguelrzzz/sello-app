import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
  navItems = [
    {label:'Inicio', link:'/home'},
    {label:'Plantillas', link:'/about'},
    {label:'Contactanos', link:'/contact'},
  ]
}
