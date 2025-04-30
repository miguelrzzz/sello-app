import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
  // navItems = [
  //   {label:'Inicio', link:'/home'},
  //   {label:'Plantillas', link:'/plantillas'},
  //   {label:'Contactanos', link:'/contact'},
  // ]
  @Input() navItems = [
    { label: 'Inicio', link: '/home' },
    { label: 'Plantillas', link: '/plantillas' },
    { label: 'Contáctanos', link: '/contact' },
  ];

  @Input() logo: string = 'Default Logo'; // Puedes pasarle un logo si quieres
  @Input() sticky: boolean = false; // Por si quieres que sea sticky cuando haces scroll
}
