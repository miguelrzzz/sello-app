import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../../service/local.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Servicios
import { UsuarioService } from '../../service/usuario.service';
import { RolesService }from '../../service/roles.service';

// Modelos
import { usuarios } from '../../models/usuarios.model';
import { Roles } from '../../models/roles.model';
import { PagesErrorComponent } from "../../shared/pages-error/pages-error.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [UsuarioService, RolesService]
})
export class LoginComponent implements OnInit {
  a : boolean = false;
  username: string = '';
  password: string = '';
  userscorrecto = 'admin@gmail.com';
  passcorrecto = 'admin';
  fullname: string = '';
  confirmPassword: string = '';

  isRegister: boolean = false;
  roles:  Roles[] = [];
  usuarios: usuarios[] = [];
  // Un Administrador es un usuario con idRol = 1
  admin = 1;
  isAdmin : boolean = false;  
  constructor(private router: Router, private localService : LocalService, private usuario_service : UsuarioService , private roles_service : RolesService){}


  onLogin() {
    const usuarioValido = this.usuarios.find(
      user => user.correo === this.username && user.password === this.password
    );
    if (usuarioValido) {
      let id = String(usuarioValido.idUsuario);
      this.localService.saveData('isLoggedIn', id);
      //Rutas de direccionamiento de acuerdo al rol
      if(usuarioValido.idRol === this.admin){
        this.isAdmin = true;
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/plantillas']);
      }

    } else {
      this.localService.saveData('isLoggedOut', 'false');
      alert('Credenciales inválidas');
    }
  }

  onRegister(){
    if(this.password !== this.confirmPassword){
      alert('Las contraseñas no coinciden');
      return;
    }
  }
  toggleForm(){
    this.isRegister = !this.isRegister;
  }
  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuario_service.getUsuarios().subscribe(data => {
      this.usuarios = data.data;
    });
  }
  cargarRoles() { 
    this.roles_service.getRoles().subscribe(data => {
      this.roles = data.data ; 
      console.log(data);
    });
  }
}
