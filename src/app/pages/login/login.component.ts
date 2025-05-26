import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../../service/local.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Servicios
import { UsuarioService } from '../../service/usuario.service';
import { RolesService } from '../../service/roles.service';

// Modelos
import { usuarios } from '../../models/usuarios.model';
import { Roles } from '../../models/roles.model';
import { Console } from 'console';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [UsuarioService, RolesService, LocalService]
})
export class LoginComponent implements OnInit {


  // Variables para el registro
  nombre: string = '';
  apPaterno: string = '';
  apMaterno: string = '';
  confirmPassword: string = '';
  email: string = '';
  password: string = '';

  isRegister: boolean = false;
  roles: Roles[] = [];
  usuarios: usuarios[] = [];

  // Un Administrador es un usuario con idRol = 1
  admin = 1;
  isAdmin: boolean = false;
  constructor(private router: Router, private localService: LocalService, private usuario_service: UsuarioService, private roles_service: RolesService, private http: HttpClient) { }


// Funciones para el login y registro
  toggleForm() {
    this.isRegister = !this.isRegister;
  }
  onLogin() {
    const usuarioValido = this.usuarios.find(usuario => usuario.correo === this.email && usuario.password === this.password);
    if (usuarioValido) {
      let email = usuarioValido.correo;
      this.localService.saveData('isLoggedIn', email);
      if (usuarioValido.idRol === this.admin) {
        this.isAdmin = true;
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }

    } else {
      this.localService.saveData('isLoggedOut', 'false');
      alert('Credenciales inválidas');
    }
  }
  onRegister() {
    const nuevoUsuario = {
      nombre: this.nombre,
      apPaterno: this.apPaterno,
      apMaterno: this.apMaterno,
      correo: this.email,
      password: this.confirmPassword,
      idEstado: 1,
      idRol: 2, // Rol de usuario normal
    };

    this.usuario_service.crearUsuario(nuevoUsuario).subscribe({
      next: (response) => {
        console.log('Respuesta exitosa:', response.body);
        alert('Usuario registrado correctamente');
        this.localService.saveData('isLoggedIn', nuevoUsuario.correo);
        
      },
      error: (err) => {
        console.error('Error detallado:', err);
        if (err.status === 400) {
          // Error de validación del servidor
          alert(err.error?.error || 'Datos inválidos. Verifica la información.');
        } else {
          alert('Error al registrar usuario: ' + (err.message || 'Error desconocido'));
        }
      }
    });
  }

  // Cargar los usuarios y roles al iniciar el componente
  cargarUsuarios() {
    this.usuario_service.getUsuarios().subscribe(data => {
      this.usuarios = data.data;
    });
  }
  cargarRoles() {
    this.roles_service.getRoles().subscribe(data => {
      this.roles = data.data;
      console.log(data);
    });
  }
  ngOnInit() {
    this.cargarRoles();
    this.cargarUsuarios();
  }
}
