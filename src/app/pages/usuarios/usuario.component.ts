import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { usuarios } from '../../models/usuarios';
@Component({
  standalone: true,
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  imports: [CommonModule, HttpClientModule],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit{
  constructor( private usuario_service : UsuarioService){}
  usuarios: usuarios[] = [];
  
  ngOnInit(): void {
    this.usuario_service.getUsuarios().subscribe(data => {
      this.usuarios = data.data;
    });
  }
}
