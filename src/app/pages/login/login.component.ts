import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../../service/local.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../service/usuario.service';
import { usuarios } from '../../models/usuarios.model';
import { HttpClientModule } from '@angular/common/http';

interface usuario{
  nombre : string;
  correo: string;
  password : string;
  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  providers: [UsuarioService]
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

  usuarios: usuarios[] = [];
  // localService: any;
  constructor(private router: Router, private localService : LocalService, private usuario_service : UsuarioService ){}


  onLogin() {
    const usuarioValido = this.usuarios.find(
      user => user.correo === this.username && user.password === this.password
    );


    if (usuarioValido) {
      let id = String(usuarioValido.idUsuario);
      this.localService.saveData('isLoggedIn', id);
      this.router.navigate(['/plantillas']);
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
    // console.
  toggleForm(){
    this.isRegister = !this.isRegister;
  }
  ngOnInit() {
    // Cargar usuarios si es necesario
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuario_service.getUsuarios().subscribe(data => {
      this.usuarios = data.data;
    });
  }
}
